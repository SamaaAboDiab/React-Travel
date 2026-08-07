import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function AdminProtectedRoute({ children }) {
  const isAdminAuthenticated = useSelector((state) => state.adminAuth.isAdminAuthenticated)

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin-login" replace />
  }

  return children
}
