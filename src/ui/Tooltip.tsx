import type { ReactNode } from 'react'
import { Tooltip as TooltipRoot, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export { TooltipProvider } from '@/components/ui/tooltip'

export interface TooltipProps {
  content: string
  children: ReactNode
}

export function Tooltip({ content, children }: TooltipProps): React.JSX.Element {
  return (
    <TooltipRoot>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </TooltipRoot>
  )
}
