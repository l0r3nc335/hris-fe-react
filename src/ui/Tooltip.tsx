import type { ReactNode } from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from '@/utils/cn'

export interface TooltipProviderProps {
  children: ReactNode
}

export function TooltipProvider({ children }: TooltipProviderProps): React.JSX.Element {
  return <TooltipPrimitive.Provider>{children}</TooltipPrimitive.Provider>
}

export interface TooltipProps {
  content: string
  children: ReactNode
}

export function Tooltip({ content, children }: TooltipProps): React.JSX.Element {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          className={cn(
            'z-50 overflow-hidden rounded-md border border-border bg-card px-3 py-1.5 text-xs shadow-md',
          )}
          sideOffset={4}
        >
          {content}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}
