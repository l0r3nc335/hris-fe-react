import { createSelector } from '@reduxjs/toolkit'
import { selectrecruitmentState } from './recruitmentSlice'
import type { RecruitmentEntity } from '@/modules/recruitment/types'

export const selectrecruitmentList = createSelector([selectrecruitmentState], (state): RecruitmentEntity[] =>
  state.ids.map((id) => state.entities[id]).filter((e): e is RecruitmentEntity => Boolean(e)),
)

export const selectrecruitmentStatus = createSelector([selectrecruitmentState], (s) => s.status)
