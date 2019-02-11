// Platform
import React, { useState, useEffect } from 'react'
// Services
import {
  isSignInWithEmailLink,
  signInWithEmailLink,
  SignInWithEmailLinkErrorCodes,
  getLastSignInAttemptEmail
} from 'firebase-auth-web'
// Components
import EmailForm from './EmailForm'
// Helpers
import getErrorMessage from './getErrorMessage'

/* 
 States:
 - validating-link: first step in validation
 - invalid-link: not a valid sign-in email link (consumer should redirect to sign-in page)
 - need-email: if (in a different device) => show email form and on submit go to 'confirming'
 - confirming-sign-in: confirming you sign-in link => show progress indicator
 - retryable-error: error ocurred when confirming sign-in. User should retry.
 - expired-link: show link to sign-in to get a new email
 - invalid-email: show when an invalid email is provided => show error and set 
*/
export const SignedInFormStates = {
  ValidatingLink: 'validating-link',
  InvalidLink: 'invalid-link',
  ValidatingEmail: 'validating-email',
  NeedEmail: 'need-email',
  ConfirmingSignIn: 'confirming-sign-in',
  RetryableError: 'retryable-error',
  ExpiredLink: 'expired-link'
  // NOTE: There is no state for confirmed because the Firbase auth state listener will detect it.
}

const SignedInForm = ({ children }) => {
  const [state, setState] = useState(SignedInFormStates.ValidatingLink)
  const [error, setError] = useState()
  const [email, setEmail] = useState(getLastSignInAttemptEmail() || '')

  const validateLink = async () => {
    if (await isSignInWithEmailLink()) {
      setState(SignedInFormStates.ValidatingEmail)
    } else {
      setState(SignedInFormStates.InvalidLink)
    }
  }

  const validateEmail = () => {
    if (email) {
      setState(SignedInFormStates.ConfirmingSignIn)
    } else {
      setState(SignedInFormStates.NeedEmail)
    }
  }

  const confirmSignIn = async () => {
    try {
      await signInWithEmailLink(email)

      // NOTE: There is no state for confirmed because the Firbase auth state listener will detect it.
    } catch (error) {
      switch (error.code) {
        case SignInWithEmailLinkErrorCodes.ExpiredActionCode:
        case SignInWithEmailLinkErrorCodes.InvalidActionCode:
          setState(SignedInFormStates.ExpiredLink)
          return
        default:
        // Do nothing
      }

      const errorMessagge = getErrorMessage(error)

      setError(errorMessagge)
      setState(SignedInFormStates.RetryableError)
    }
  }

  const nextState = async () => {
    switch (state) {
      case SignedInFormStates.ValidatingLink:
        await validateLink()
        break
      case SignedInFormStates.ValidatingEmail:
        validateEmail()
        break
      case SignedInFormStates.ConfirmingSignIn:
        await confirmSignIn()
        break
      default:
        // Other states should be end states
        break
    }
  }

  const emailSubmitted = email => {
    setEmail(email)
    setState(SignedInFormStates.ConfirmingSignIn)
  }

  const renderEmailForm = () => {
    return (
      <EmailForm
        onSubmit={emailSubmitted}
        email={email}
        submitButtonText="Confirm email"
      />
    )
  }

  useEffect(() => {
    nextState()
  }, [state])

  return (
    <React.Fragment>{children(state, error, renderEmailForm)}</React.Fragment>
  )
}

export default SignedInForm
