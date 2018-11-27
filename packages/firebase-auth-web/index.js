import { auth } from './src/auth'
import { getLastSignInAttemptEmail } from './src/getLastSignInAttemptEmail'
import { getUserDisplayName } from './src/getUserDisplayName'
import { getUserDisplayFirstName } from './src/getUserDisplayFirstName'
import { getUserEmail } from './src/getUserEmail'
import { getUserId } from './src/getUserId'
import { isSignInWithEmailLink } from './src/isSignInWithEmailLink'
import {
  sendSignInEmail,
  SendSignInEmailErrorCodes
} from './src/sendSignInEmail'
import {
  signInWithEmailLink,
  SignInWithEmailLinkErrorCodes
} from './src/signInWithEmailLink'
import { signOut } from './src/signOut'
import { updateEmail, UpdateEmailErrorCodes } from './src/updateEmail'

export {
  auth,
  getLastSignInAttemptEmail,
  getUserDisplayName,
  getUserDisplayFirstName,
  getUserEmail,
  getUserId,
  isSignInWithEmailLink,
  sendSignInEmail,
  signInWithEmailLink,
  signOut,
  updateEmail,
  SendSignInEmailErrorCodes,
  SignInWithEmailLinkErrorCodes,
  UpdateEmailErrorCodes
}
