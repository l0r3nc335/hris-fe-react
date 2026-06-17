import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { LoginPage } from '@/modules/auth/pages/LoginPage'
import { renderWithProviders } from '@/test/utils'

describe('LoginPage integration', () => {
  it('submits credentials against the live API', async () => {
    const user = userEvent.setup()
    const { container, store } = renderWithProviders(<LoginPage />, { authenticated: false })

    const emailInput = container.querySelector('input[name="email"]')
    const passwordInput = container.querySelector('input[name="password"]')
    expect(emailInput).not.toBeNull()
    expect(passwordInput).not.toBeNull()

    await user.type(emailInput!, 'admin@hris.com')
    await user.type(passwordInput!, 'password')
    await user.click(screen.getByRole('button', { name: 'Sign in' }))

    await waitFor(
      () => {
        expect(store.getState().auth.isAuthenticated).toBe(true)
      },
      { timeout: 15000 },
    )
  })
})
