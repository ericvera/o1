import { useState, useEffect } from 'react'
import { fetchSignInMethodsForEmail } from './fetchSignInMethodsForEmail'
import { sendSignInEmail } from './sendSignInEmail'
import getErrorMessage from './getErrorMessage'

export const SignInState = {
  NeedEmail: 'need-email',
  CheckingAccountExist: 'checking-account-exist',
  AccountDoesNotExist: 'account-does-not-exist',
  SendingEmail: 'sending-email',
  RetryableError: 'retryable-error',
  EmailSent: 'email-sent'
}

export default (signedInPath, skipSignInMethodCheck = false) => {
  const [state, setState] = useState(SignInState.NeedEmail)
  const [error, setError] = useState()
  const [email, setEmail] = useState()

  useEffect(() => {
    const handleSignInMethodsResult = signInMethods => {
      if (signInMethods && signInMethods.length > 0) {
        setState(SignInState.SendingEmail)
      } else {
        setState(SignInState.AccountDoesNotExist)
      }
    }

    const handleEmailSent = () => {
      setState(SignInState.EmailSent)
    }

    const handleError = error => {
      const errorMessagge = getErrorMessage(error)

      setError(errorMessagge)
      setState(SignInState.RetryableError)
    }

    const checkAccountExist = () => {
      fetchSignInMethodsForEmail(email)
        .then(handleSignInMethodsResult)
        .catch(handleError)
    }

    const sendEmail = () => {
      sendSignInEmail(email, signedInPath)
        .then(handleEmailSent)
        .catch(handleError)
    }

    switch (state) {
      case SignInState.CheckingAccountExist:
        checkAccountExist()
        break
      case SignInState.SendingEmail:
        sendEmail()
        break
      default:
        // Other states should be end states
        break
    }
  }, [state])

  useEffect(() => {
    if (email) {
      if (skipSignInMethodCheck) {
        setState(SignInState.SendingEmail)
      } else {
        setState(SignInState.CheckingAccountExist)
      }
    }
  }, [email])

  return [state, error, email, setEmail]
}
