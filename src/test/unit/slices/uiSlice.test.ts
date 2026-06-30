import { describe, expect, it } from 'vitest'
import { uiReducer, toggleNavGroup, setCommandPaletteOpen } from '@/slices/uiSlice'

describe('uiSlice', () => {
  it('toggles expanded nav groups', () => {
    let state = uiReducer(undefined, toggleNavGroup('overview'))
    expect(state.expandedNavGroups).toContain('overview')

    state = uiReducer(state, toggleNavGroup('overview'))
    expect(state.expandedNavGroups).not.toContain('overview')
  })

  it('sets command palette open state', () => {
    const state = uiReducer(undefined, setCommandPaletteOpen(true))
    expect(state.commandPaletteOpen).toBe(true)
  })
})
