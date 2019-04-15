import { AuthErrors } from './auth'
import { FetchSignInMethodsForEmailErrorCodes } from './fetchSignInMethodsForEmail'
import { SendSignInEmailErrorCodes } from './sendSignInEmail'
import { SignInWithEmailLinkErrorCodes } from './signInWithEmailLink'

export default error => {
  switch (error.code) {
    case FetchSignInMethodsForEmailErrorCodes.InvalidEmail:
    case SignInWithEmailLinkErrorCodes.InvalidEmail:
    case SendSignInEmailErrorCodes.InvalidEmail:
      return 'There seems to be something wrong with your email. Please double check it and try again.'
    case AuthErrors.NetworkRequestFailed:
      return 'It seems there is a problem with the internet connection. Please make sure your internet connection is working and try again.'
    case AuthErrors.TooManyRequests:
      return 'It seems we are experiencing more traffic than usual. Please try again in a minute or two.'
    default:
      return undefined
  }
}
