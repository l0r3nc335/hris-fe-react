import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '@/services/api/payrollApi'
import type { PayrollEntity } from '@/modules/payroll/types'
import type { RootState } from '@/store'
import { normalizeEntities } from '@/utils/normalize'

export interface PayrollState {
  ids: string[]
  entities: Record<string, PayrollEntity>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: PayrollState = {
  ids: [],
  entities: {},
  status: 'idle',
  error: null,
}

export const fetchPayrollList = createAsyncThunk(
  'payroll/fetchList',
  async () => api.listPayroll(),
)

const payrollSlice = createSlice({
  name: 'payroll',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayrollList.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchPayrollList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const normalized = normalizeEntities(action.payload)
        state.ids = normalized.ids
        state.entities = normalized.entities as Record<string, PayrollEntity>
      })
      .addCase(fetchPayrollList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to load'
      })
  },
})

export const payrollReducer = payrollSlice.reducer
export const selectpayrollState = (state: RootState): PayrollState => state.payroll
