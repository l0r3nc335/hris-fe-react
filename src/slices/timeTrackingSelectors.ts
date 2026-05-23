import { createSelector } from '@reduxjs/toolkit'
import { selecttimeTrackingState } from './timeTrackingSlice'
import type { TimeTrackingEntity } from '@/modules/timeTracking/types'

export const selecttimeTrackingList = createSelector([selecttimeTrackingState], (state): TimeTrackingEntity[] =>
  state.ids.map((id) => state.entities[id]).filter((e): e is TimeTrackingEntity => Boolean(e)),
)

export const selecttimeTrackingStatus = createSelector([selecttimeTrackingState], (s) => s.status)
