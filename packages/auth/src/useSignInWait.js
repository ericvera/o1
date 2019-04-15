import { useState, useEffect, useCallback } from 'react'
import { getLastSignInAttemptEmail } from './getLastSignInAttemptEmail'
import { sendSignInEmail } from './sendSignInEmail'
import getErrorMessage from './getErrorMessage'

export const SignInWaitState = {
  ValidatingEmail: 'validating-email',
  NoEmail: 'no-email',
  WaitingForEmail: 'waiting-for-email',
  SendingEmail: 'sending-email',
  RetryableError: 'retryable-error'
}

export default signedInPath => {
  const [state, setState] = useState(SignInWaitState.ValidatingEmail)
  const [error, setError] = useState()
  const [email, setEmail] = useState()

  useEffect(() => {
    const validateEmail = () => {
      const savedEmail = getLastSignInAttemptEmail()
      setEmail(savedEmail)

      if (savedEmail) {
        setState(SignInWaitState.WaitingForEmail)
      } else {
        setState(SignInWaitState.NoEmail)
      }
    }

    const handleEmailSent = () => {
      setState(SignInWaitState.WaitingForEmail)
    }

    const handleError = error => {
      const errorMessagge = getErrorMessage(error)

      setError(errorMessagge)
      setState(SignInWaitState.RetryableError)
    }

    const sendEmail = () => {
      sendSignInEmail(email, signedInPath)
        .then(handleEmailSent)
        .catch(handleError)
    }

    switch (state) {
      case SignInWaitState.ValidatingEmail:
        validateEmail()
        break
      case SignInWaitState.SendingEmail:
        sendEmail()
        break
      default:
        // Other states should be end states
        break
    }
  }, [state])

  const resendEmail = useCallback(() => {
    setState(SignInWaitState.SendingEmail)
  }, [])

  return [state, error, email, resendEmail]
}
