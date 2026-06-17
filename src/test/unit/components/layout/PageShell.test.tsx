import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AppBreadcrumbs } from '@/components/layout/AppBreadcrumbs'
import { PageShell } from '@/components/layout/PageShell'
import { renderWithProviders } from '@/test/utils'

describe('AppBreadcrumbs', () => {
  it('renders breadcrumb trail for employees route', () => {
    renderWithProviders(<AppBreadcrumbs />, { route: '/employees' })

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Employees')).toBeInTheDocument()
  })
})

describe('PageShell', () => {
  it('renders title, description, and children', () => {
    renderWithProviders(
      <PageShell title="Test Page" description="Test description">
        <p>Page content</p>
      </PageShell>,
    )

    expect(screen.getByRole('heading', { name: 'Test Page' })).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
    expect(screen.getByText('Page content')).toBeInTheDocument()
  })
})
