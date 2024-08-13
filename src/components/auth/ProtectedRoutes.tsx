import { PropsWithChildren, useEffect } from 'react'
import { useNavigate } from 'react-router'

export default function ProtectedRoutes({ children }: PropsWithChildren) {
  const navigate = useNavigate()
  useEffect(() => {
    const user = localStorage.getItem('userbonds')

    // comprobation to check if token is valid

    if (!user) {
      navigate('/login')
    }
  })
  return <>{children}</>
}
