import { createSelector } from '@reduxjs/toolkit'
import { selectinterviewsState } from './interviewsSlice'
import type { InterviewsEntity } from '@/modules/interviews/types'

export const selectinterviewsList = createSelector([selectinterviewsState], (state): InterviewsEntity[] =>
  state.ids.map((id) => state.entities[id]).filter((e): e is InterviewsEntity => Boolean(e)),
)

export const selectinterviewsStatus = createSelector([selectinterviewsState], (s) => s.status)
