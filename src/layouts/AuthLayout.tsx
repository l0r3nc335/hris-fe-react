import { Outlet, Navigate } from 'react-router-dom'
import { useAppSelector } from '@/hooks'
import { PageLoader } from '@/components/PageLoader'
import { selectAuthStatus, selectIsAuthenticated, selectUser } from '@/slices/authSlice'
import { getPostLoginPath } from '@/utils/postLoginRedirect'
import { PublicNavbar } from '@/components/layout/PublicNavbar'

export function AuthLayout(): React.JSX.Element {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const user = useAppSelector(selectUser)
  const status = useAppSelector(selectAuthStatus)

  const isRestoringSession =
    status === 'loading' || (isAuthenticated && user === null)

  if (isRestoringSession) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <PageLoader />
      </div>
    )
  }

  if (isAuthenticated && user) {
    return <Navigate to={getPostLoginPath(user)} replace />
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <PublicNavbar />
      <main className="flex min-h-0 flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  )
}
