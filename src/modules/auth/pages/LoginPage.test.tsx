import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LoginPage } from '@/modules/auth/pages/LoginPage'
import { renderWithProviders } from '@/test/utils'

describe('LoginPage', () => {
  it('renders sign-in form', () => {
    renderWithProviders(<LoginPage />, { authenticated: false })

    expect(screen.getByText('Enterprise HRIS — sign in with your account')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument()
  })
})
