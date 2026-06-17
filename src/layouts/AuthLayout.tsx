import { Link, Outlet, Navigate } from 'react-router-dom'
import { useAppSelector } from '@/hooks'
import { selectIsAuthenticated } from '@/slices/authSlice'
import { ROUTES } from '@/constants/routes'

export function AuthLayout(): React.JSX.Element {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  if (isAuthenticated) return <Navigate to={ROUTES.home} replace />
  return (
    <div className="flex min-h-screen flex-col bg-muted">
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="mx-auto flex max-w-md items-center gap-2">
          <Link to={ROUTES.landing} className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
              H
            </div>
            <span className="font-semibold">HRIS Enterprise</span>
          </Link>
        </div>
      </header>
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-sm">
          <Outlet />
        </div>
      </div>
      <footer className="border-t border-border px-6 py-3 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} HRIS Enterprise
      </footer>
    </div>
  )
}
