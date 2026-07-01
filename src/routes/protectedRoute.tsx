import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Suspense } from 'react'
import { useAppSelector } from '@/hooks'
import { selectAuthStatus, selectIsAuthenticated } from '@/slices/authSlice'
import { usePermission } from '@/hooks/usePermission'
import type { Permission } from '@/constants/permissions'
import { isKnownRoute, ROUTES } from '@/constants/routes'
import { PublicNotFoundShell } from '@/layouts/PublicNotFoundShell'
import { PageLoader } from '@/components/PageLoader'
import { NotFoundPage } from '@/routes/lazyRoutes'

export interface ProtectedRouteProps {
  permissions?: Permission[]
}

export function ProtectedRoute({
  permissions,
}: ProtectedRouteProps): React.JSX.Element {
  const { pathname } = useLocation()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const status = useAppSelector(selectAuthStatus)
  const { can } = usePermission()

  if (status === 'loading') return <></>
  if (!isAuthenticated) {
    if (isKnownRoute(pathname)) {
      return <Navigate to={ROUTES.login} replace />
    }
    return <PublicNotFoundShell />
  }
  if (permissions?.length && !permissions.some((p) => can(p))) {
    return (
      <Suspense fallback={<PageLoader />}>
        <NotFoundPage />
      </Suspense>
    )
  }
  return <Outlet />
}
