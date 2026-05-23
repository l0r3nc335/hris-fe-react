import { createSelector } from '@reduxjs/toolkit'
import { selecttenantsState } from './tenantsSlice'
import type { TenantsEntity } from '@/modules/tenants/types'

export const selecttenantsList = createSelector([selecttenantsState], (state): TenantsEntity[] =>
  state.ids.map((id) => state.entities[id]).filter((e): e is TenantsEntity => Boolean(e)),
)

export const selecttenantsStatus = createSelector([selecttenantsState], (s) => s.status)
