import { renderHook, act, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useRecordSearchList } from '@/hooks/useRecordSearchList'
import { USER_SEARCH_FIELDS } from '@/modules/users/searchFields'

function createWrapper(queryClient: QueryClient) {
  return function Wrapper({ children }: { children: ReactNode }): React.JSX.Element {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
}

describe('useRecordSearchList', () => {
  it('calls searchFn on Search with non-empty criteria', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    })
    const searchFn = vi.fn().mockResolvedValue({
      data: [{ id: '1', name: 'Test User', status: 'active' }],
      meta: { page: 1, limit: 20, total: 1 },
    })

    const { result } = renderHook(
      () =>
        useRecordSearchList({
          fields: USER_SEARCH_FIELDS,
          listFn: vi.fn(),
          trashedListFn: vi.fn(),
          searchFn,
          queryKeyPrefix: ['users'],
          fetchDefaultList: false,
        }),
      { wrapper: createWrapper(queryClient) },
    )

    act(() => {
      result.current.searchPanelProps.onChange('firstName', 'User')
    })

    act(() => {
      result.current.searchPanelProps.onSearch()
    })

    await waitFor(() => {
      expect(searchFn).toHaveBeenCalledOnce()
      expect(result.current.listSource.items).toHaveLength(1)
    })

    expect(searchFn).toHaveBeenCalledWith(
      { firstName: 'User', page: 1, limit: 20 },
      { trashed: false },
    )
    expect(result.current.isSearchActive).toBe(true)
  })
})
