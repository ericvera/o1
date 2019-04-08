import { auth } from './auth'

export const fetchSignInMethodsForEmail = async email =>
  auth.fetchSignInMethodsForEmail(email)

export const FetchSignInMethodsForEmailErrorCodes = {
  // User Input
  // - Thrown if the email address is invalid.
  InvalidEmail: 'auth/invalid-email'
}
