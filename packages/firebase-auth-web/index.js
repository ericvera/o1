import { auth, AuthErrors } from './src/auth'
import { getLastSignInAttemptEmail } from './src/getLastSignInAttemptEmail'
import { getUserDisplayName } from './src/getUserDisplayName'
import { getUserDisplayFirstName } from './src/getUserDisplayFirstName'
import { getUserDisplayLastName } from './src/getUserDisplayLastName'
import { getUserEmail } from './src/getUserEmail'
import { getUserId } from './src/getUserId'
import { isSignInWithEmailLink } from './src/isSignInWithEmailLink'
import { reload } from './src/reload'
import {
  sendSignInEmail,
  SendSignInEmailErrorCodes
} from './src/sendSignInEmail'
import {
  signInWithEmailLink,
  SignInWithEmailLinkErrorCodes
} from './src/signInWithEmailLink'
import { signOut } from './src/signOut'
import { updateDisplayName } from './src/updateDisplayName'
import { updateEmail, UpdateEmailErrorCodes } from './src/updateEmail'

export {
  auth,
  AuthErrors,
  getLastSignInAttemptEmail,
  getUserDisplayName,
  getUserDisplayFirstName,
  getUserDisplayLastName,
  getUserEmail,
  getUserId,
  isSignInWithEmailLink,
  reload,
  sendSignInEmail,
  signInWithEmailLink,
  signOut,
  updateDisplayName,
  updateEmail,
  SendSignInEmailErrorCodes,
  SignInWithEmailLinkErrorCodes,
  UpdateEmailErrorCodes
}
