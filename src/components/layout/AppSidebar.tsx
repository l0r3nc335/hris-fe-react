import { NavLink } from 'react-router-dom'
import { ChevronDown, Search, Settings } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { setSidebarSearchQuery, toggleNavGroup } from '@/slices/uiSlice'
import { NAV_GROUPS } from '@/constants/navigation'
import { usePermission } from '@/hooks/usePermission'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/utils/cn'
import { Input } from '@/components/ui/input'
import { Button } from '@/ui'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ScrollArea } from '@/components/ui/scroll-area'

interface AppSidebarProps {
  onNavigate?: () => void
}

export function AppSidebar({ onNavigate }: AppSidebarProps): React.JSX.Element {
  const dispatch = useAppDispatch()
  const expandedGroups = useAppSelector((s) => s.ui.expandedNavGroups)
  const searchQuery = useAppSelector((s) => s.ui.sidebarSearchQuery)
  const { can } = usePermission()

  const normalizedQuery = searchQuery.trim().toLowerCase()

  const filteredGroups = NAV_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter((item) => {
      const permitted = !item.permission || can(item.permission)
      if (!permitted) return false
      if (!normalizedQuery) return true
      return item.label.toLowerCase().includes(normalizedQuery)
    }),
  })).filter((group) => group.items.length > 0)

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b border-sidebar-border px-4 font-semibold text-sidebar-foreground">
        HRIS Enterprise
      </div>
      <div className="border-b border-sidebar-border p-3">
        <div className="relative">
          <Search className="absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Filter menu..."
            value={searchQuery}
            onChange={(e) => dispatch(setSidebarSearchQuery(e.target.value))}
            className="pl-8"
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <nav className="space-y-1 p-2">
          {filteredGroups.map((group) => {
            const isExpanded = expandedGroups.includes(group.id)
            return (
              <Collapsible
                key={group.id}
                open={isExpanded}
                onOpenChange={() => dispatch(toggleNavGroup(group.id))}
              >
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase hover:bg-accent/50">
                  {group.label}
                  <ChevronDown
                    className={cn(
                      'h-3.5 w-3.5 transition-transform',
                      isExpanded && 'rotate-180',
                    )}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-0.5 pt-1 pb-2">
                  {group.items.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.path === ROUTES.home}
                      onClick={onNavigate}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'text-sidebar-foreground hover:bg-accent',
                        )
                      }
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </NavLink>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )
          })}
        </nav>
      </ScrollArea>
      <div className="border-t border-sidebar-border p-2">
        <Button variant="ghost" size="sm" className="w-full justify-start gap-2" asChild>
          <NavLink to={ROUTES.settings} onClick={onNavigate}>
            <Settings className="h-4 w-4" />
            Settings
          </NavLink>
        </Button>
      </div>
    </div>
  )
}
