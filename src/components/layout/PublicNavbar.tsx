import { Link, NavLink } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Button } from '@/ui'
import { ROUTES } from '@/constants/routes'
import { PUBLIC_NAV } from '@/constants/publicNavigation'
import { cn } from '@/utils/cn'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

function Logo(): React.JSX.Element {
  return (
    <Link to={ROUTES.landing} className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
        H
      </div>
      <span className="font-semibold">HRIS Enterprise</span>
    </Link>
  )
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }): React.JSX.Element {
  return (
    <>
      {PUBLIC_NAV.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'rounded-md px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
            )
          }
        >
          {item.label}
        </NavLink>
      ))}
    </>
  )
}

export function PublicNavbar(): React.JSX.Element {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-4 md:px-6">
      <Logo />

      <nav className="hidden items-center gap-1 md:flex">
        <NavLinks />
      </nav>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="hidden sm:inline-flex" asChild>
          <Link to={ROUTES.login}>Login</Link>
        </Button>
        <Button size="sm" className="hidden sm:inline-flex" asChild>
          <Link to={ROUTES.register}>Get Started</Link>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <div className="mt-6 flex flex-col gap-1">
              <NavLinks />
              <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
                <Button variant="outline" asChild>
                  <Link to={ROUTES.login}>Login</Link>
                </Button>
                <Button asChild>
                  <Link to={ROUTES.register}>Get Started</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
