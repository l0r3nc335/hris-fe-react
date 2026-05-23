import { createSelector } from '@reduxjs/toolkit'
import { selectAnalyticsState } from './analyticsSlice'

export const selectAnalyticsDashboard = createSelector(
  [selectAnalyticsState],
  (s) => s.dashboard,
)
export const selectAnalyticsStatus = createSelector([selectAnalyticsState], (s) => s.status)
