import { renderHook, act } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import { mockListItems } from '@/test/fixtures'

function createMutationMock() {
  return {
    mutate: vi.fn(),
    isPending: false,
  }
}

function createHooks(overrides?: Partial<Parameters<typeof useEntityCrudPage>[0]['hooks']>) {
  return {
    useList: () => ({
      data: mockListItems,
      meta: { page: 1, limit: 20, total: mockListItems.length },
      isLoading: false,
    }),
    useTrashedList: () => ({
      data: [],
      meta: { page: 1, limit: 20, total: 0 },
      isLoading: false,
    }),
    useCreate: createMutationMock,
    useUpdate: createMutationMock,
    useSoftDelete: createMutationMock,
    useRestore: createMutationMock,
    useRemove: createMutationMock,
    ...overrides,
  }
}

describe('useEntityCrudPage', () => {
  it('exposes list page props with items', () => {
    const { result } = renderHook(() =>
      useEntityCrudPage({
        title: 'Employees',
        description: 'Manage employees',
        emptyTitle: 'No employees found',
        entitySingular: 'employee',
        hooks: createHooks(),
      }),
    )

    expect(result.current.listPageProps.title).toBe('Employees')
    expect(result.current.listPageProps.items).toEqual(mockListItems)
    expect(result.current.listPageProps.showActions).toBe(true)
    expect(result.current.listPageProps.clientSideFilter).toBe(true)
  })

  it('opens create form when onCreate is triggered', () => {
    const { result } = renderHook(() =>
      useEntityCrudPage({
        title: 'Employees',
        description: 'Manage employees',
        emptyTitle: 'No employees found',
        entitySingular: 'employee',
        hooks: createHooks(),
      }),
    )

    act(() => {
      result.current.listPageProps.onCreate?.()
    })

    expect(result.current.formDialogProps.open).toBe(true)
    expect(result.current.formDialogProps.mode).toBe('create')
    expect(result.current.formDialogProps.title).toBe('Create employee')
  })

  it('populates split name fields from display name when editing', () => {
    const { result } = renderHook(() =>
      useEntityCrudPage({
        title: 'Users',
        description: 'Manage users',
        emptyTitle: 'No users found',
        entitySingular: 'user',
        nameFields: 'split',
        hooks: createHooks({
          useList: () => ({
            data: [{ id: 'user-1', name: 'Jane Doe', status: 'active' }],
            meta: { page: 1, limit: 20, total: 1 },
            isLoading: false,
          }),
        }),
      }),
    )

    act(() => {
      result.current.listPageProps.onEdit?.({
        id: 'user-1',
        name: 'Jane Doe',
        status: 'active',
      })
    })

    expect(result.current.formDialogProps.initialValues).toEqual(
      expect.objectContaining({
        firstName: 'Jane',
        lastName: 'Doe',
        status: 'active',
      }),
    )
  })
})
