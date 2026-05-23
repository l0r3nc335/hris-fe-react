import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from '@/utils/cn'

export function TooltipProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  return <TooltipPrimitive.Provider>{children}</TooltipPrimitive.Provider>
}

export function Tooltip({
  content,
  children,
}: {
  content: string
  children: React.ReactNode
}): React.JSX.Element {
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
