import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

// أي صفحة عايزينها تفضل مخفية إلا لو المستخدم مسجل دخول
// (زي صفحة "طلباتي" مثلاً) هنغلفها بالكومبوننت ده
export default function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
