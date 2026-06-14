import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import * as Sentry from '@sentry/react'
import { router } from '@/routes'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { TooltipProvider } from '@/ui'
import { queryClient } from '@/lib/queryClient'

if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.VITE_APP_ENV ?? 'development',
  })
}

export function Providers(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ErrorBoundary>
          <RouterProvider router={router} />
          <Toaster richColors position="top-right" />
        </ErrorBoundary>
      </TooltipProvider>
    </QueryClientProvider>
  )
}
