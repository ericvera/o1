import firebase from 'firebase/app'
import 'firebase/auth'

export const auth = firebase.auth()

export const AuthErrors = {
  // Require additional actions
  // - Thrown if the user's last sign-in time does not meet the security threshold. Use firebase.User#reauthenticateWithCredential to resolve. This does not apply if the user is anonymous.
  RequiresRecentLogin: 'auth/requires-recent-login',
  // - Thrown if the user's credential has expired. This could also be thrown if a user has been deleted. Prompting the user to sign in again should resolve this for either case.
  UserTokenExpired: 'auth/user-token-expired',
  // Transient errors
  // - Thrown if a network error (such as timeout, interrupted connection or unreachable host) has occurred.
  NetworkRequestFailed: 'auth/network-request-failed',
  // - Thrown if requests are blocked from a device due to unusual activity. Trying again after some delay would unblock.
  TooManyRequests: 'auth/too-many-requests',
  // Code/System Problems
  // - Thrown if the instance of FirebaseApp has been deleted.
  AppDeleted: 'auth/app-deleted',
  // - Thrown if the app identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.
  AppNotAuthorized: 'auth/app-not-authorized',
  // - Thrown if a method is called with incorrect arguments.
  ArgumentError: 'auth/argument-error',
  // - Thrown if the provided API key is invalid. Please check that you have copied it correctly from the Firebase Console.
  InvalidAPIKey: 'auth/invalid-api-key',
  // - Thrown if the user's credential is no longer valid. The user must sign in again.
  InalidUserToken: 'auth/invalid-user-token',
  // - Thrown if you have not enabled the provider in the Firebase Console. Go to the Firebase Console for your project, in the Auth section and the Sign in Method tab and configure the provider.
  OperationNotAllowed: 'auth/operation-not-allowed',
  // - Thrown if the app domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.
  UnauthorizedDomain: 'auth/unauthorized-domain',
  // - Thrown if the user account has been disabled by an administrator. Accounts can be enabled or disabled in the Firebase Console, the Auth section and Users subsection.
  UserDisabled: 'auth/user-disabled',
  // - Thrown if the browser does not support web storage or if the user disables them.
  WebStorageUnsupported: 'auth/web-storage-unsupported'
}
