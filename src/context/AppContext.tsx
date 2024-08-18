import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import { UserContextType, UserI } from '../types/types'

const UserContext = createContext<UserContextType>({
  tokenIsValid: false,
  user: {},
  setUser: () => {},
  loading: true,
})

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserI | object>({})
  const [tokenIsValid, setTokenIsValid] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('userbonds')

    if (!token) {
      setLoading(false)
      return
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/auth/verifyToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((response) => {
        setTokenIsValid(response.success)
        setUser(response.user || {})
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <UserContext.Provider value={{ tokenIsValid, user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  return useContext(UserContext)
}
