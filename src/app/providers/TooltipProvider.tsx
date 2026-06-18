import { TooltipProvider as UiTooltipProvider } from '@/ui'

export function TooltipProvider({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return <UiTooltipProvider>{children}</UiTooltipProvider>
}
