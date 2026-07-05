import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '@/store/rootReducer'
import { usePermission } from '@/hooks/usePermission'
import { PERMISSIONS } from '@/constants/permissions'
import { mockAdminUser } from '@/test/fixtures'
import type { ReactNode } from 'react'

function createWrapper(user = mockAdminUser) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      auth: {
        user,
        isAuthenticated: true,
        status: 'succeeded',
        error: null,
      },
    },
  })

  return function Wrapper({ children }: { children: ReactNode }): React.JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }
}

describe('usePermission', () => {
  it('grants all permissions to admin users', () => {
    const { result } = renderHook(() => usePermission(), { wrapper: createWrapper() })
    expect(result.current.can(PERMISSIONS.employeesRead)).toBe(true)
    expect(result.current.can(PERMISSIONS.billingRead)).toBe(true)
  })

  it('grants all permissions to superadmin users', () => {
    const { result } = renderHook(() => usePermission(), {
      wrapper: createWrapper({
        ...mockAdminUser,
        role: 'superadmin',
        permissions: [],
      }),
    })
    expect(result.current.can(PERMISSIONS.subscriptionsRead)).toBe(true)
  })

  it('checks explicit permissions for non-admin users', () => {
    const { result } = renderHook(() => usePermission(), {
      wrapper: createWrapper({
        ...mockAdminUser,
        role: 'manager',
        permissions: [PERMISSIONS.employeesRead],
      }),
    })

    expect(result.current.can(PERMISSIONS.employeesRead)).toBe(true)
    expect(result.current.can(PERMISSIONS.billingRead)).toBe(false)
  })
})
