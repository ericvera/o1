import { auth } from './auth'

export const signInWithEmailLink = async email => {
  await auth.signInWithEmailLink(email)

  window.localStorage.removeItem('o1-auth-email')
}

export const SignInWithEmailLinkErrorCodes = {
  // User Input
  // - Thrown if the email address is not valid.
  InvalidEmail: 'auth/invalid-email',
  // - Thrown if OTP in email link expires.
  ExpiredActionCode: 'auth/expired-action-code',
  // Code/System Problems
  // - Thrown if the user corresponding to the given email has been disabled.
  UserDisabled: 'auth/user-disabled',
  // - This can happen if the code is malformed, expired, or has already been used.
  InvalidActionCode: 'auth/invalid-action-code'
}
