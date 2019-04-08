import { auth } from './auth'

export const getUserDisplayFirstName = async () => {
  const displayName = await auth.currentUser.displayName

  if (displayName) {
    return displayName.split(' ')[0]
  }

  return undefined
}
