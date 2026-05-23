import { createSelector } from '@reduxjs/toolkit'
import { selectrolesState } from './rolesSlice'
import type { RolesEntity } from '@/modules/roles/types'

export const selectrolesList = createSelector([selectrolesState], (state): RolesEntity[] =>
  state.ids.map((id) => state.entities[id]).filter((e): e is RolesEntity => Boolean(e)),
)

export const selectrolesStatus = createSelector([selectrolesState], (s) => s.status)
