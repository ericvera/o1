import auth from './auth'

export const updateEmail = async email => auth.currentUser.updateEmail(email)

export const UpdateEmailErrorCodes = {
  // User Input
  // - Thrown if the email address is invalid.
  InvalidEmail: 'auth/invalid-email',
  // - Thrown if the email is already used by another user.
  EmailAlreadyInUse: 'auth/email-already-in-use',
  // - Thrown if the user's last sign-in time does not meet the security threshold.
  RequiresRecentLogin: 'auth/requires-recent-login'
}
