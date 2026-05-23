import { createSelector } from '@reduxjs/toolkit'
import { selectperformanceState } from './performanceSlice'
import type { PerformanceEntity } from '@/modules/performance/types'

export const selectperformanceList = createSelector([selectperformanceState], (state): PerformanceEntity[] =>
  state.ids.map((id) => state.entities[id]).filter((e): e is PerformanceEntity => Boolean(e)),
)

export const selectperformanceStatus = createSelector([selectperformanceState], (s) => s.status)
