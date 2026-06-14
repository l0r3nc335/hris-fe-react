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
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

function NavLinks({ onNavigate }: { onNavigate?: () => void }): React.JSX.Element {
  const { can } = usePermission()
  const visibleNav = MAIN_NAV.filter((item) => !item.permission || can(item.permission))

  return (
    <nav className="flex flex-col gap-1 p-2">
      {visibleNav.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === ROUTES.home}
          onClick={onNavigate}
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
  )
}

export function DashboardLayout(): React.JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)
  const sidebarOpen = useAppSelector((s) => s.ui.sidebarOpen)
  const { theme, setThemeMode } = useTheme()

  const handleLogout = (): void => {
    void dispatch(logout()).then(() => navigate(ROUTES.login))
  }

  const initials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
    : 'G'

  return (
    <div className="flex min-h-screen">
      <aside
        className={cn(
          'hidden border-r border-sidebar-border bg-sidebar md:block md:transition-all',
          sidebarOpen ? 'md:w-64' : 'md:w-0 md:overflow-hidden',
        )}
      >
        <div className="flex h-14 items-center border-b border-sidebar-border px-4 font-semibold text-sidebar-foreground">
          HRIS
        </div>
        <NavLinks />
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-border px-4">
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <SheetHeader className="border-b border-border px-4 py-3">
                  <SheetTitle>HRIS</SheetTitle>
                </SheetHeader>
                <NavLinks />
              </SheetContent>
            </Sheet>
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:inline-flex"
              onClick={() => dispatch(toggleSidebar())}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setThemeMode(theme === 'dark' ? 'light' : 'dark')
              }}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <span className="hidden text-sm text-muted-foreground sm:inline">
                    {user ? `${user.firstName} ${user.lastName}` : 'Guest'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem disabled>
                  {user?.email ?? 'Not signed in'}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
