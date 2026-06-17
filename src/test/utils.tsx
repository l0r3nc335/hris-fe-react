import { type ReactElement, type ReactNode } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '@/store/rootReducer'
import type { RootState } from '@/store'
import { ThemeProvider } from '@/components/ThemeProvider'
import { TooltipProvider } from '@/ui'
import { mockAdminUser } from '@/test/fixtures'
import type { User } from '@/types'

function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
}

export interface RenderWithProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string
  authenticated?: boolean
  user?: User
  preloadedState?: Partial<RootState>
}

export function renderWithProviders(
  ui: ReactElement,
  {
    route = '/',
    authenticated = true,
    user = mockAdminUser,
    preloadedState,
    ...renderOptions
  }: RenderWithProvidersOptions = {},
) {
  const queryClient = createTestQueryClient()
  const store = configureStore({
    reducer: rootReducer,
    preloadedState:
      preloadedState ??
      (authenticated
        ? {
            auth: {
              user,
              isAuthenticated: true,
              status: 'succeeded',
              error: null,
            },
          }
        : undefined),
  })

  function Wrapper({ children }: { children: ReactNode }): React.JSX.Element {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <TooltipProvider>
              <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
            </TooltipProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    )
  }

  return {
    store,
    queryClient,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  }
}
