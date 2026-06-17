import type { ReactNode } from 'react'
import { AppBreadcrumbs } from './AppBreadcrumbs'
import { AppFooter } from './AppFooter'

export interface PageShellProps {
  children: ReactNode
  title?: string
  description?: string
  toolbar?: ReactNode
  showBreadcrumbs?: boolean
  showFooter?: boolean
}

export function PageShell({
  children,
  title,
  description,
  toolbar,
  showBreadcrumbs = true,
  showFooter = false,
}: PageShellProps): React.JSX.Element {
  return (
    <div className="flex min-h-full flex-col">
      <div className="flex-1 space-y-4">
        {showBreadcrumbs ? (
          <div className="md:hidden">
            <AppBreadcrumbs />
          </div>
        ) : null}
        {(title || description || toolbar) && (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            {(title || description) && (
              <div>
                {title ? (
                  <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                ) : null}
                {description ? (
                  <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                ) : null}
              </div>
            )}
            {toolbar ? <div className="flex shrink-0 items-center gap-2">{toolbar}</div> : null}
          </div>
        )}
        {children}
      </div>
      {showFooter ? <AppFooter /> : null}
    </div>
  )
}
