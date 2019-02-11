import {
  AuthErrors,
  SignInWithEmailLinkErrorCodes,
  SendSignInEmailErrorCodes
} from 'firebase-auth-web'

export default error => {
  switch (error.code) {
    case SignInWithEmailLinkErrorCodes.InvalidEmail:
    case SendSignInEmailErrorCodes.InvalidEmail:
      return 'There seems to be something wrong with your email. Please double check it and try again.'
    case AuthErrors.NetworkRequestFailed:
      return 'It seems there is a problem with the internet connection. Please make sure your internet connection is working and try again.'
    case AuthErrors.TooManyRequests:
      return 'It seems we are experiencing more traffic than usual. Please try again in a minute or two.'
    default:
      return `This is an unexpected error. Please try again and if the problem continues copy this and send it to our support mail: (code: ${error.code ||
        'no code'} / message: ${error.message || error})`
  }
}
