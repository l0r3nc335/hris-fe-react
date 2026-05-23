import { Outlet, Navigate } from 'react-router-dom'
import { useAppSelector } from '@/hooks'
import { selectIsAuthenticated } from '@/slices/authSlice'
import { ROUTES } from '@/constants/routes'

export function AuthLayout(): React.JSX.Element {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  if (isAuthenticated) return <Navigate to={ROUTES.home} replace />
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-sm">
        <Outlet />
      </div>
    </div>
  )
}
