import { useState, useEffect } from 'react'
import { getLastSignInAttemptEmail } from './getLastSignInAttemptEmail'
import { isSignInWithEmailLink } from './isSignInWithEmailLink'
import {
  signInWithEmailLink,
  SignInWithEmailLinkErrorCodes
} from './signInWithEmailLink'

import getErrorMessage from './getErrorMessage'

export const SignedInState = {
  ValidatingLink: 'validating-link',
  InvalidLink: 'invalid-link',
  ValidatingEmail: 'validating-email',
  NeedEmail: 'need-email',
  ConfirmingSignIn: 'confirming-sign-in',
  RetryableError: 'retryable-error',
  ExpiredLink: 'expired-link'
  // NOTE: There is no state for confirmed because the Firbase auth state listener will detect it.
}

export default () => {
  const [state, setState] = useState(SignedInState.ValidatingLink)
  const [error, setError] = useState()
  const [email, setEmail] = useState(getLastSignInAttemptEmail() || '')

  useEffect(() => {
    const handleError = error => {
      setError(error)
      setState(SignedInState.RetryableError)
    }

    const validateLink = () => {
      isSignInWithEmailLink()
        .then(result => {
          if (result) {
            setState(SignedInState.ValidatingEmail)
          } else {
            setState(SignedInState.InvalidLink)
          }
        })
        .catch(handleError)
    }

    const validateEmail = () => {
      if (email) {
        setState(SignedInState.ConfirmingSignIn)
      } else {
        setState(SignedInState.NeedEmail)
      }
    }

    const confirmSignIn = () => {
      signInWithEmailLink(email)
        .then(() => {
          // NOTE: There is no state for confirmed because the Firbase auth state listener will detect it.
        })
        .catch(error => {
          switch (error.code) {
            case SignInWithEmailLinkErrorCodes.ExpiredActionCode:
            case SignInWithEmailLinkErrorCodes.InvalidActionCode:
              setState(SignedInState.ExpiredLink)
              return
            default:
            //Report the error back
          }

          const errorMessagge = getErrorMessage(error)
          handleError(errorMessagge)
        })
    }

    switch (state) {
      case SignedInState.ValidatingLink:
        validateLink()
        break
      case SignedInState.ValidatingEmail:
        validateEmail()
        break
      case SignedInState.ConfirmingSignIn:
        confirmSignIn()
        break
      default:
        // Other states should be end states
        break
    }
  }, [state])

  const setUserProvidedEmail = email => {
    setEmail(email)
    setState(SignedInState.ConfirmingSignIn)
  }

  return [state, error, setUserProvidedEmail]
}
