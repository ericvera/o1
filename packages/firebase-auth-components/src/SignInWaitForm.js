// Platform
import React, { useEffect, useRef, useState } from 'react'
// Services
import { getLastSignInAttemptEmail, sendSignInEmail } from 'firebase-auth-web'
// Components
import EmailForm from './EmailForm'
// Helpers
import getErrorMessage from './getErrorMessage'

/* 
 States:
 - validating-email: make sure that there is an email
 - no-email: this is an invalid state as the user should not get here  without an email
 - waiting-for-sign-in-email: this will show a countdown
 - retryable-error: error ocurred when confirming sign-in. User should retry.
*/
export const SignInWaitFormStates = {
  ValidatingEmail: 'validating-email',
  NoEmail: 'no-email',
  WaitingForSignInEmail: 'waiting-for-sign-in-email',
  SendingSignInEmail: 'sending-sign-in-email',
  RetryableError: 'retryable-error'
}

const SignInWaitForm = ({ children, allowDomain, signedInPath }) => {
  const emailFormRef = useRef()

  const [state, setState] = useState(SignInWaitFormStates.ValidatingEmail)
  const [error, setError] = useState()
  const [email, setEmail] = useState('')

  const validateEmail = () => {
    const savedEmail = getLastSignInAttemptEmail()
    setEmail(savedEmail)

    if (savedEmail) {
      setState(SignInWaitFormStates.WaitingForSignInEmail)
    } else {
      setState(SignInWaitFormStates.NoEmail)
    }
  }

  const waitForSignInMail = () => {
    emailForm.current.resetDelay()
  }

  const resendSignInMail = async () => {
    try {
      await sendSignInEmail(email, signedInPath)

      setState(SignInWaitFormStates.WaitingForSignInEmail)
    } catch (error) {
      const errorMessagge = getErrorMessage(error)

      setError(errorMessagge)
      setState(SignedInFormStates.RetryableError)
    }
  }

  const nextState = async () => {
    switch (state) {
      case SignInWaitForm.ValidatingEmail:
        validateEmail()
        break
      case SignInWaitForm.WaitingForSignInEmail:
        waitForSignInMail()
        break
      case SignInWaitForm.SendingSignInEmail:
        await resendSignInMail()
        break
      default:
        // Other states should be end states
        break
    }
  }

  const emailSubmitted = () => {
    setState(SignInWaitFormStates.SendingSignInEmail)
  }

  const renderResendForm = () => {
    return (
      <EmailForm
        ref={emailFormRef}
        onSubmit={emailSubmitted}
        email={email}
        submitButtonText="Send again"
        hideEmailInput={true}
        allowDomain={allowDomain}
      />
    )
  }

  useEffect(() => {
    nextState()
  }, [state])

  return (
    <React.Fragment>{children(state, error, renderResendForm)}</React.Fragment>
  )
}

export default SignInWaitForm
