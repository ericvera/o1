import { useEffect, useState } from 'react'
import { auth } from './auth'

export default () => {
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState()
  const [user, setUser] = useState()
  const [claims, setClaims] = useState()

  useEffect(() => {
    const listener = auth.onIdTokenChanged(setUser)

    return () => {
      listener()
    }
  }, [auth])

  useEffect(() => {
    if (user === undefined) {
      return
    }

    if (user) {
      user.getIdTokenResult().then(setToken)
    } else {
      setToken(null)
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (token === undefined) {
      return
    }

    if (token) {
      setClaims(token.claims)
      setLoading(false)
    } else {
      setToken(null)
    }
  }, [token])

  return {
    loading,
    user: user && claims ? { ...user, claims } : null
  }
}
