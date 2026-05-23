import { createSelector } from '@reduxjs/toolkit'
import { selectbillingState } from './billingSlice'
import type { BillingEntity } from '@/modules/billing/types'

export const selectbillingList = createSelector([selectbillingState], (state): BillingEntity[] =>
  state.ids.map((id) => state.entities[id]).filter((e): e is BillingEntity => Boolean(e)),
)

export const selectbillingStatus = createSelector([selectbillingState], (s) => s.status)
