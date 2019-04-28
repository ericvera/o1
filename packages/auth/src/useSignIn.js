import { useState, useEffect } from 'react'
import { fetchSignInMethodsForEmail } from './fetchSignInMethodsForEmail'
import { sendSignInEmail } from './sendSignInEmail'
import getErrorMessage from './getErrorMessage'

export const SignInState = {
  NeedEmail: 'need-email',
  SendingEmail: 'sending-email',
  RetryableError: 'retryable-error',
  EmailSent: 'email-sent'
}

export default signedInPath => {
  const [state, setState] = useState(SignInState.NeedEmail)
  const [error, setError] = useState()
  const [email, setEmail] = useState()

  useEffect(() => {
    const handleEmailSent = () => {
      setState(SignInState.EmailSent)
    }

    const handleError = error => {
      const errorMessagge = getErrorMessage(error)

      setError(errorMessagge)
      setState(SignInState.RetryableError)
    }

    const sendEmail = () => {
      sendSignInEmail(email, signedInPath)
        .then(handleEmailSent)
        .catch(handleError)
    }

    switch (state) {
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
      setState(SignInState.SendingEmail)
    }
  }, [email])

  return [state, error, email, setEmail]
}
