import { fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { EntityListPage } from '@/components/EntityListPage'
import { mockListItems } from '@/test/fixtures'
import { renderWithProviders } from '@/test/utils'

describe('EntityListPage', () => {
  it('renders loading skeleton', () => {
    renderWithProviders(
      <EntityListPage
        title="Employees"
        description="Manage employees"
        emptyTitle="No employees found"
        items={[]}
        isLoading
      />,
    )

    expect(screen.getByRole('heading', { name: 'Employees' })).toBeInTheDocument()
  })

  it('renders rows and supports create action', async () => {
    const user = userEvent.setup()
    const onCreate = vi.fn()

    renderWithProviders(
      <EntityListPage
        title="Employees"
        description="Manage employees"
        emptyTitle="No employees found"
        items={mockListItems}
        isLoading={false}
        onCreate={onCreate}
        showActions
      />,
    )

    expect(screen.getByText('Sample record')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Add' }))
    expect(onCreate).toHaveBeenCalledOnce()
  })

  it('toggles show deleted filter', () => {
    const onShowDeletedChange = vi.fn()

    renderWithProviders(
      <EntityListPage
        title="Employees"
        description="Manage employees"
        emptyTitle="No employees found"
        items={mockListItems}
        isLoading={false}
        showDeleted={false}
        onShowDeletedChange={onShowDeletedChange}
      />,
    )

    fireEvent.click(screen.getByLabelText('Show deleted'))
    expect(onShowDeletedChange).toHaveBeenCalledWith(true)
  })
})
