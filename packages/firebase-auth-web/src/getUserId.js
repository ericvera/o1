import auth from './auth'

export const getUserId = async () => auth.currentUser.uid
