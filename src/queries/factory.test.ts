import { QueryClient } from '@tanstack/react-query'
import { describe, expect, it } from 'vitest'
import { createListQueryOptions } from '@/queries/factory'

describe('createListQueryOptions', () => {
  it('fetches list data through react-query', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    })

    const listFn = async () => [{ id: '1', name: 'Alpha', status: 'active' }]
    const options = createListQueryOptions(['test', 'list'], listFn)
    const data = await queryClient.fetchQuery(options)

    expect(data).toEqual([{ id: '1', name: 'Alpha', status: 'active' }])
  })
})
