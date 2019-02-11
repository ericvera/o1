// Platform
import React, { useEffect, useState } from 'react'
// Services
import { sendSignInEmail } from 'firebase-auth-web'
// Components
import EmailForm from './EmailForm'
// Helpers
import getErrorMessage from './getErrorMessage'

/* 
 States:
 - need-email: if (in a different device) => show email form and on submit go to 'confirming'
 - sending-sign-in-email: does what it says
 - retryable-error: error ocurred when confirming sign-in. User should retry.
 - sign-in-email-sent: consumer should navigate to a page that uses the SignInWaitForm
*/
export const SignInFormStates = {
  NeedEmail: 'need-email',
  SendingSignInEmail: 'sending-sign-in-email',
  RetryableError: 'retryable-error',
  SignInEmailSent: 'sign-in-email-sent'
  // NOTE: There is no state for confirmed because the Firbase auth state listener will detect it.
}

const SignInForm = ({ allowDomain, signedInPath }) => {
  const [state, setState] = useState(SignInFormStates.NeedEmail)
  const [error, setError] = useState()
  const [email, setEmail] = useState('')

  const sendEmail = async () => {
    try {
      await sendSignInEmail(email, signedInPath)

      setState(SignInFormStates.SignInEmailSent)
    } catch (error) {
      const errorMessagge = getErrorMessage(error)

      setError(errorMessagge)
      setState(SignedInFormStates.RetryableError)
    }
  }

  const nextState = async () => {
    switch (state) {
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
    setState(SignInFormStates.SendingSignInEmail)
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

  return (
    <React.Fragment>{children(state, error, renderEmailForm)}</React.Fragment>
  )
}

export default SignInForm
