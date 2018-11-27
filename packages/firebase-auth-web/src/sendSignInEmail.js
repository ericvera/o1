import { auth } from './auth'

export const sendSignInEmail = async (email, signInPath) => {
  const { location } = window
  const { protocol, hostname, port } = location

  const portToken = port ? `:${port}` : ''
  const url = `${protocol}//${hostname}${portToken}${signInPath}`

  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be whitelisted in the Firebase Console.
    url,
    // This must be true.
    handleCodeInApp: true
  }

  window.localStorage.setItem('firebase-auth-web-email', email)

  await auth.sendSignInLinkToEmail(email, actionCodeSettings)
}

export const SendSignInEmailErrorCodes = {
  // User Input
  // - Thrown if the email address is not valid.
  InvalidEmail: 'auth/invalid-email',
  // Code/System Problems
  // A continue URL must be provided in the request.
  MissingContinueUri: 'auth/missing-continue-uri',
  //The continue URL provided in the request is invalid.
  InvalidContinueUri: 'auth/invalid-continue-uri',
  // Thrown if handleCodeInApp is false.
  ArgumentError: 'auth/argument-error',
  // An Android package name must be provided if the Android app is required to be installed.
  MissingAndroidPkgName: 'auth/missing-android-pkg-name',
  // An iOS Bundle ID must be provided if an App Store ID is provided.
  MissingIOSBundleId: 'auth/missing-ios-bundle-id',
  // The domain of the continue URL is not whitelisted. Whitelist the domain in the Firebase console.
  UnauthorizedContinueUri: 'auth/unauthorized-continue-uri'
}
