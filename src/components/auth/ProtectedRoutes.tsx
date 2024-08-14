import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '../../context/AppContext'
import Loading from '../ui/Loading'

export default function ProtectedRoutes() {
  const localUser = localStorage.getItem('userbonds')
  const { tokenIsValid, loading } = useUser()

  if (loading) {
    return <Loading />
  }

  if (!localUser || !tokenIsValid) return <Navigate to='/login' />

  return <Outlet />
}
