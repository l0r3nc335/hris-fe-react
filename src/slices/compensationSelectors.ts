import { createSelector } from '@reduxjs/toolkit'
import { selectcompensationState } from './compensationSlice'
import type { CompensationEntity } from '@/modules/compensation/types'

export const selectcompensationList = createSelector([selectcompensationState], (state): CompensationEntity[] =>
  state.ids.map((id) => state.entities[id]).filter((e): e is CompensationEntity => Boolean(e)),
)

export const selectcompensationStatus = createSelector([selectcompensationState], (s) => s.status)
