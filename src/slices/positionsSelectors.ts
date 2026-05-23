import { createSelector } from '@reduxjs/toolkit'
import { selectpositionsState } from './positionsSlice'
import type { PositionsEntity } from '@/modules/positions/types'

export const selectpositionsList = createSelector([selectpositionsState], (state): PositionsEntity[] =>
  state.ids.map((id) => state.entities[id]).filter((e): e is PositionsEntity => Boolean(e)),
)

export const selectpositionsStatus = createSelector([selectpositionsState], (s) => s.status)
