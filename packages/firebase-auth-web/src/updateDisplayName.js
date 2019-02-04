import { auth } from './auth'

export const updateDisplayName = async name =>
  auth.currentUser.updateProfile({
    displayName: name
  })
