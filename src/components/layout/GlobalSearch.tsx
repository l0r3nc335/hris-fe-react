import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { setCommandPaletteOpen } from '@/slices/uiSlice'
import { MAIN_NAV } from '@/constants/navigation'
import { usePermission } from '@/hooks/usePermission'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'

export function GlobalSearch(): React.JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const open = useAppSelector((s) => s.ui.commandPaletteOpen)
  const { can } = usePermission()

  const visibleNav = useMemo(
    () => MAIN_NAV.filter((item) => !item.permission || can(item.permission)),
    [can],
  )

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent): void => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        dispatch(setCommandPaletteOpen(true))
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [dispatch])

  const handleSelect = (path: string): void => {
    dispatch(setCommandPaletteOpen(false))
    navigate(path)
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={(value) => dispatch(setCommandPaletteOpen(value))}
      title="Global search"
      description="Search pages and navigate quickly"
    >
      <Command>
        <CommandInput placeholder="Search pages..." />
        <CommandList>
          <CommandEmpty>No pages found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            {visibleNav.map((item) => (
              <CommandItem
                key={item.path}
                value={`${item.label} ${item.path}`}
                onSelect={() => handleSelect(item.path)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Shortcuts">
            <CommandItem onSelect={() => handleSelect('/')}>Go to Dashboard</CommandItem>
            <CommandItem onSelect={() => handleSelect('/settings')}>Open Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
