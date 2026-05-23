import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '@/hooks'
import { selectIsAuthenticated } from '@/slices/authSlice'
import { usePermission } from '@/hooks/usePermission'
import type { Permission } from '@/constants/permissions'
import { ROUTES } from '@/constants/routes'

export function ProtectedRoute({
  permissions,
}: {
  permissions?: Permission[]
}): React.JSX.Element {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const { can } = usePermission()

  if (!isAuthenticated) return <Navigate to={ROUTES.login} replace />
  if (permissions?.length && !permissions.some((p) => can(p))) {
    return <Navigate to={ROUTES.home} replace />
  }
  return <Outlet />
}
