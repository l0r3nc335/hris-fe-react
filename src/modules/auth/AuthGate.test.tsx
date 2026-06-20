import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AuthGate } from '@/modules/auth/AuthGate'
import { renderWithProviders } from '@/test/utils'

describe('AuthGate', () => {
  it('renders children when not restoring session', () => {
    renderWithProviders(
      <AuthGate>
        <p>App content</p>
      </AuthGate>,
      { authenticated: true },
    )

    expect(screen.getByText('App content')).toBeInTheDocument()
  })

  it('renders children when unauthenticated', () => {
    renderWithProviders(
      <AuthGate>
        <p>Public content</p>
      </AuthGate>,
      { authenticated: false },
    )

    expect(screen.getByText('Public content')).toBeInTheDocument()
  })

  it('shows loader while session is restoring', () => {
    renderWithProviders(
      <AuthGate>
        <p>App content</p>
      </AuthGate>,
      {
        preloadedState: {
          auth: {
            user: null,
            isAuthenticated: true,
            status: 'loading',
            error: null,
          },
        },
      },
    )

    expect(screen.queryByText('App content')).not.toBeInTheDocument()
    expect(document.querySelector('.animate-pulse')).toBeInTheDocument()
  })
})
