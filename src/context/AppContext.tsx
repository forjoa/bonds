import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import { UserContextType } from '../types/types'

const UserContext = createContext<UserContextType>({
  tokenIsValid: false,
  user: {},
  setUser: () => {},
})

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState({})
  const [tokenIsValid, setTokenIsValid] = useState(false)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/verifyToken`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('userbonds'),
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        setTokenIsValid(response.success)
        setUser(response.user)
      })
  }, [])

  return (
    <UserContext.Provider value={{ tokenIsValid, user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  return useContext(UserContext)
}
