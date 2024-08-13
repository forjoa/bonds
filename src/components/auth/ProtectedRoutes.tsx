import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoutes() {
  const user = localStorage.getItem('userbonds')

  // comprobation to check if token is valid

  return user ? <Outlet /> : <Navigate to='/login' />
}
