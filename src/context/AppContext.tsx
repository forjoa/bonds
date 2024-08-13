import { createContext, PropsWithChildren, useContext, useState } from 'react'

const UserContext = createContext({})

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState(null) // Aquí manejarás los datos del usuario

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  return useContext(UserContext)
}
