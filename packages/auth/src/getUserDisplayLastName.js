import { auth } from './auth'

export const getUserDisplayLastName = async () => {
  const displayName = await auth.currentUser.displayName

  if (displayName) {
    const tokens = displayName.split(' ')

    if (tokens.length > 1) {
      return tokens[tokens.length - 1]
    }
  }

  return undefined
}
