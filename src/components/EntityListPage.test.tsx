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

  it('filters rows client-side when clientSideFilter is enabled', async () => {
    const user = userEvent.setup()
    const onSearchChange = vi.fn()
    const onStatusFilterChange = vi.fn()

    renderWithProviders(
      <EntityListPage
        title="Users"
        description="Manage users"
        emptyTitle="No users found"
        items={[
          { id: '1', name: 'Jane Doe', status: 'active' },
          { id: '2', name: 'John Smith', status: 'inactive' },
        ]}
        isLoading={false}
        clientSideFilter
        searchValue=""
        onSearchChange={onSearchChange}
        statusFilter="all"
        onStatusFilterChange={onStatusFilterChange}
        page={1}
        limit={20}
        onPageChange={() => undefined}
        onLimitChange={() => undefined}
      />,
    )

    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    expect(screen.getByText('John Smith')).toBeInTheDocument()

    await user.type(screen.getByPlaceholderText('Search records...'), 'jane')
    expect(onSearchChange).toHaveBeenCalled()
  })
})
