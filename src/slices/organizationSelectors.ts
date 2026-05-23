import { createSelector } from '@reduxjs/toolkit'
import { selectorganizationState } from './organizationSlice'
import type { OrganizationEntity } from '@/modules/organization/types'

export const selectorganizationList = createSelector([selectorganizationState], (state): OrganizationEntity[] =>
  state.ids.map((id) => state.entities[id]).filter((e): e is OrganizationEntity => Boolean(e)),
)

export const selectorganizationStatus = createSelector([selectorganizationState], (s) => s.status)
