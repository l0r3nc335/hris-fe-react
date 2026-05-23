import { createSelector } from '@reduxjs/toolkit'
import { selectsystemState } from './systemSlice'
import type { SystemEntity } from '@/modules/system/types'

export const selectsystemList = createSelector([selectsystemState], (state): SystemEntity[] =>
  state.ids.map((id) => state.entities[id]).filter((e): e is SystemEntity => Boolean(e)),
)

export const selectsystemStatus = createSelector([selectsystemState], (s) => s.status)
