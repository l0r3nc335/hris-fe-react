import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { RecordSearchPanel } from '@/components/RecordSearchPanel'
import { USER_SEARCH_FIELDS } from '@/modules/users/searchFields'
import { createEmptySearchValues } from '@/utils/searchCriteria'
import { renderWithProviders } from '@/test/utils'

describe('RecordSearchPanel', () => {
  it('renders configured fields and triggers search/clear', async () => {
    const user = userEvent.setup()
    const onSearch = vi.fn()
    const onClear = vi.fn()
    const onChange = vi.fn()

    renderWithProviders(
      <RecordSearchPanel
        fields={USER_SEARCH_FIELDS}
        values={createEmptySearchValues(USER_SEARCH_FIELDS)}
        onChange={onChange}
        onSearch={onSearch}
        onClear={onClear}
      />,
    )

    expect(screen.getByText('Search records')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Search records' }))
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('First name')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Search' }))
    expect(onSearch).toHaveBeenCalledOnce()

    await user.click(screen.getByRole('button', { name: 'Clear' }))
    expect(onClear).toHaveBeenCalledOnce()
  })
})
