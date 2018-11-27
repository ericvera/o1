import auth from './auth'

export const isSignInWithEmailLink = async () =>
  auth.isSignInWithEmailLink(window.location.href)
