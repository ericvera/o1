import { auth, AuthErrors } from './src/auth'
import {
  fetchSignInMethodsForEmail,
  FetchSignInMethodsForEmailErrorCodes
} from './src/fetchSignInMethodsForEmail'
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
import useAuthState from './src/useAuthState'
import useSignedIn, { SignedInState } from './src/useSignedIn'
import useSignIn, { SignInState } from './src/useSignIn'
import useSignInWait, { SignInWaitState } from './src/useSignInWait'

export {
  auth,
  AuthErrors,
  fetchSignInMethodsForEmail,
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
  useAuthState,
  useSignedIn,
  useSignIn,
  useSignInWait,
  FetchSignInMethodsForEmailErrorCodes,
  SendSignInEmailErrorCodes,
  SignInWithEmailLinkErrorCodes,
  SignedInState,
  SignInState,
  SignInWaitState,
  UpdateEmailErrorCodes
}
