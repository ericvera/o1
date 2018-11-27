import { auth } from './auth'

export const getUserEmail = async () => auth.currentUser.email
