import { auth } from './auth'

export const reload = async () => auth.currentUser.reload()
