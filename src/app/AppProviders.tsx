import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/components/ThemeProvider'
import { AuthGate } from '@/modules/auth/AuthGate'
import type { AppStore } from '@/store'
import { composeProviders } from './providers/composeProviders'
import { ErrorBoundaryProvider } from './providers/ErrorBoundaryProvider'
import { QueryProvider } from './providers/QueryProvider'
import { TooltipProvider } from './providers/TooltipProvider'

const CoreProviders = composeProviders(
  QueryProvider,
  ThemeProvider,
  TooltipProvider,
  ErrorBoundaryProvider,
)

export interface AppProvidersProps {
  store: AppStore
  children: ReactNode
}

export function AppProviders({ store, children }: AppProvidersProps): React.JSX.Element {
  return (
    <Provider store={store}>
      <CoreProviders>
        <AuthGate>{children}</AuthGate>
        <Toaster richColors position="top-right" closeButton />
      </CoreProviders>
    </Provider>
  )
}