import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LogOut, Menu, Moon, Sun } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { logout, selectUser } from '@/slices/authSlice'
import { toggleSidebar } from '@/slices/uiSlice'
import { MAIN_NAV } from '@/constants/navigation'
import { usePermission } from '@/hooks/usePermission'
import { useTheme } from '@/hooks/useTheme'
import { Button } from '@/ui'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/utils/cn'

export function DashboardLayout(): React.JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)
  const sidebarOpen = useAppSelector((s) => s.ui.sidebarOpen)
  const { can } = usePermission()
  const { theme, setThemeMode } = useTheme()

  const visibleNav = MAIN_NAV.filter((item) => !item.permission || can(item.permission))

  const handleLogout = (): void => {
    void dispatch(logout()).then(() => navigate(ROUTES.login))
  }

  return (
    <div className="flex min-h-screen">
      <aside
        className={cn(
          'border-r border-border bg-card transition-all',
          sidebarOpen ? 'w-64' : 'w-0 overflow-hidden',
        )}
      >
        <div className="flex h-14 items-center border-b border-border px-4 font-semibold">
          HRIS
        </div>
        <nav className="flex flex-col gap-1 p-2">
          {visibleNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === ROUTES.home}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-3 py-2 text-sm transition-colors',
                  isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-accent',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-border px-4">
          <Button variant="ghost" size="icon" onClick={() => dispatch(toggleSidebar())}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setThemeMode(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <span className="text-sm text-muted-foreground">
              {user ? `${user.firstName} ${user.lastName}` : 'Guest'}
            </span>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
