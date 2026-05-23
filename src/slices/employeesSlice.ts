import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '@/services/api/employeesApi'
import type { EmployeesEntity } from '@/modules/employees/types'
import type { RootState } from '@/store'
import { normalizeEntities } from '@/utils/normalize'

export interface EmployeesState {
  ids: string[]
  entities: Record<string, EmployeesEntity>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: EmployeesState = {
  ids: [],
  entities: {},
  status: 'idle',
  error: null,
}

export const fetchEmployeesList = createAsyncThunk('employees/fetchList', async () =>
  api.listEmployees(),
)

/** Reference pattern: optimistic update on mutation thunks */
export const deactivateEmployeeOptimistic = createAsyncThunk(
  'employees/deactivate',
  async (id: string, { getState }) => {
    const state = getState() as RootState
    const existing = state.employees.entities[id]
    if (!existing) throw new Error('Employee not found')
    return { ...existing, status: 'inactive' }
  },
)

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeesList.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchEmployeesList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const normalized = normalizeEntities(action.payload)
        state.ids = normalized.ids
        state.entities = normalized.entities as Record<string, EmployeesEntity>
      })
      .addCase(fetchEmployeesList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to load'
      })
      .addCase(deactivateEmployeeOptimistic.pending, (state, action) => {
        const id = action.meta.arg
        const entity = state.entities[id]
        if (entity) entity.status = 'inactive'
      })
      .addCase(deactivateEmployeeOptimistic.rejected, (state, action) => {
        state.error = action.error.message ?? 'Update failed'
      })
  },
})

export const employeesReducer = employeesSlice.reducer
export const selectemployeesState = (state: RootState): EmployeesState => state.employees
