import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PublicNavbar } from '@/components/layout/PublicNavbar'
import { ROUTES } from '@/constants/routes'
import { renderWithProviders } from '@/test/utils'

describe('PublicNavbar', () => {
  it('renders logo and public nav links', () => {
    renderWithProviders(<PublicNavbar />, { authenticated: false })

    expect(screen.getByText('HRIS Enterprise')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', ROUTES.about)
    expect(screen.getByRole('link', { name: 'Pricing' })).toHaveAttribute('href', ROUTES.pricing)
    expect(screen.getByRole('link', { name: 'Contact Us' })).toHaveAttribute(
      'href',
      ROUTES.contact,
    )
  })

  it('renders Login link pointing to auth login', () => {
    renderWithProviders(<PublicNavbar />, { authenticated: false })

    const loginLinks = screen.getAllByRole('link', { name: 'Login' })
    expect(loginLinks.length).toBeGreaterThan(0)
    loginLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', ROUTES.login)
    })
  })
})
