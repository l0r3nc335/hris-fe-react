import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

export interface CardEdgeGlowProps {
  children: ReactNode
  className?: string
}

export function CardEdgeGlow({
  children,
  className,
}: CardEdgeGlowProps): React.JSX.Element {
  return (
    <div className={cn('group relative h-full rounded-xl', className)}>
      <div
        className={cn(
          'pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300',
          'bg-gradient-to-r from-blue-500/50 via-violet-500/50 to-blue-500/50',
          'group-hover:opacity-100',
        )}
      />
      <div
        className={cn(
          'pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300',
          'bg-gradient-to-b from-blue-500/10 via-transparent to-transparent',
          'group-hover:opacity-100',
        )}
      />
      <div className="relative h-full rounded-xl border-0 bg-card">
        {children}
      </div>
    </div>
  )
}
