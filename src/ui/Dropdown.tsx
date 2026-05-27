import type { ReactNode } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { cn } from '@/utils/cn'

export interface DropdownItem {
  label: string
  onSelect: () => void
  destructive?: boolean
}

export interface DropdownProps {
  trigger: ReactNode
  items: DropdownItem[]
}

export function Dropdown({ trigger, items }: DropdownProps): React.JSX.Element {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-card p-1 shadow-md"
          sideOffset={4}
        >
          {items.map((item) => (
            <DropdownMenu.Item
              key={item.label}
              className={cn(
                'cursor-pointer rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent',
                item.destructive && 'text-destructive',
              )}
              onSelect={item.onSelect}
            >
              {item.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
