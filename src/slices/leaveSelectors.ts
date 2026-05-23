import { createSelector } from '@reduxjs/toolkit'
import { selectleaveState } from './leaveSlice'
import type { LeaveEntity } from '@/modules/leave/types'

export const selectleaveList = createSelector([selectleaveState], (state): LeaveEntity[] =>
  state.ids.map((id) => state.entities[id]).filter((e): e is LeaveEntity => Boolean(e)),
)

export const selectleaveStatus = createSelector([selectleaveState], (s) => s.status)
