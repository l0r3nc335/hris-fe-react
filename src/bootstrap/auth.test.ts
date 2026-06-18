import { configureStore } from '@reduxjs/toolkit'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { rootReducer } from '@/store/rootReducer'
import { bootstrapAuth } from './auth'

vi.mock('@/services/httpClient', () => ({
  setAuthHandlers: vi.fn(),
  getAccessToken: vi.fn(),
}))

const { setAuthHandlers, getAccessToken } = await import('@/services/httpClient')

describe('bootstrapAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('registers auth handlers on the HTTP client', () => {
    vi.mocked(getAccessToken).mockReturnValue(null)
    const store = configureStore({ reducer: rootReducer })

    bootstrapAuth(store)

    expect(setAuthHandlers).toHaveBeenCalledOnce()
    expect(setAuthHandlers).toHaveBeenCalledWith(
      expect.objectContaining({
        refresh: expect.any(Function) as unknown,
        unauthorized: expect.any(Function) as unknown,
      }),
    )
  })

  it('dispatches session restore when an access token exists', () => {
    vi.mocked(getAccessToken).mockReturnValue('token-123')
    const store = configureStore({ reducer: rootReducer })
    const dispatchSpy = vi.spyOn(store, 'dispatch')

    bootstrapAuth(store)

    expect(dispatchSpy).toHaveBeenCalledOnce()
  })

  it('skips fetchMe when no access token exists', () => {
    vi.mocked(getAccessToken).mockReturnValue(null)
    const store = configureStore({ reducer: rootReducer })
    const dispatchSpy = vi.spyOn(store, 'dispatch')

    bootstrapAuth(store)

    expect(dispatchSpy).not.toHaveBeenCalled()
  })
})
