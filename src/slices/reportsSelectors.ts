import { createSelector } from '@reduxjs/toolkit'
import { selectreportsState } from './reportsSlice'
import type { ReportsEntity } from '@/modules/reports/types'

export const selectreportsList = createSelector([selectreportsState], (state): ReportsEntity[] =>
  state.ids.map((id) => state.entities[id]).filter((e): e is ReportsEntity => Boolean(e)),
)

export const selectreportsStatus = createSelector([selectreportsState], (s) => s.status)
