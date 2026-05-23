import { createSelector } from '@reduxjs/toolkit'
import { selectpayrollState } from './payrollSlice'
import type { PayrollEntity } from '@/modules/payroll/types'

export const selectpayrollList = createSelector([selectpayrollState], (state): PayrollEntity[] =>
  state.ids.map((id) => state.entities[id]).filter((e): e is PayrollEntity => Boolean(e)),
)

export const selectpayrollStatus = createSelector([selectpayrollState], (s) => s.status)
