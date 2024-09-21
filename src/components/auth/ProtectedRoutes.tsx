import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '../../context/AppContext'
import Loading from '../ui/Loading'
import { useEffect, useState } from 'react'

export default function ProtectedRoutes() {
  const { tokenIsValid, loading } = useUser()
  const [shouldRedirect, setShouldRedirect] = useState(false)

  useEffect(() => {
    if (!loading && !tokenIsValid) {
      setShouldRedirect(true)
    }
  }, [loading, tokenIsValid])

  if (loading) return <Loading />

  if (shouldRedirect) {
    return <Navigate to='/login' />
  }

  return <Outlet />
}