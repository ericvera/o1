import { auth } from './auth'

export const getUserDisplayName = async () => auth.currentUser.displayName
