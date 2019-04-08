// Platform
import React, { useEffect, useState } from 'react'
// Services
import { fetchSignInMethodsForEmail, sendSignInEmail } from '@o1/auth'
// Components
import EmailForm from './EmailForm'
// Helpers
import getErrorMessage from './getErrorMessage'

export const SignInFormStates = {
  NeedEmail: 'need-email',
  CheckingAccountExist: 'checking-account-exist',
  AccountDoesNotExist: 'account-does-not-exist',
  SendingSignInEmail: 'sending-sign-in-email',
  RetryableError: 'retryable-error',
  SignInEmailSent: 'sign-in-email-sent'
  // NOTE: There is no state for confirmed because the Firebase auth state listener will detect it.
}

const SignInForm = ({ children, allowDomain, signedInPath }) => {
  const [state, setState] = useState(SignInFormStates.NeedEmail)
  const [error, setError] = useState()
  const [email, setEmail] = useState('')

  const checkAccountExist = async () => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(email)

      if (signInMethods && signInMethods.length > 0) {
        setState(SignInFormStates.SendingSignInEmail)
      } else {
        setState(SignInFormStates.AccountDoesNotExist)
      }
    } catch (error) {
      const errorMessagge = getErrorMessage(error)

      setError(errorMessagge)
      setState(SignInFormStates.RetryableError)
    }
  }

  const sendEmail = async () => {
    try {
      await sendSignInEmail(email, signedInPath)

      setState(SignInFormStates.SignInEmailSent)
    } catch (error) {
      const errorMessagge = getErrorMessage(error)

      setError(errorMessagge)
      setState(SignInFormStates.RetryableError)
    }
  }

  const nextState = async () => {
    switch (state) {
      case SignInFormStates.CheckingAccountExist:
        await checkAccountExist()
        break
      case SignInFormStates.SendingSignInEmail:
        await sendEmail()
        break
      default:
        // Other states should be end states
        break
    }
  }

  const emailSubmitted = email => {
    setEmail(email)
    setState(SignInFormStates.CheckingAccountExist)
  }

  const renderEmailForm = () => {
    return (
      <EmailForm
        onSubmit={emailSubmitted}
        submitButtonText="Send me a sign-in email"
        allowDomain={allowDomain}
      />
    )
  }

  useEffect(() => {
    nextState()
  }, [state])

  return <>{children(state, error, renderEmailForm)}</>
}

export default SignInForm
