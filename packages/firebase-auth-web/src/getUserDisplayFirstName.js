import auth from './auth'

export const getUserDisplayName = async () => {
  const displayName = await auth.currentUser.displayName

  if (displayName) {
    return displayName.split(' ')[0]
  }

  return undefined
}
