import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '@/services/api/departmentsApi'
import type { DepartmentsEntity } from '@/modules/departments/types'
import type { RootState } from '@/store'
import { normalizeEntities } from '@/utils/normalize'

export interface DepartmentsState {
  ids: string[]
  entities: Record<string, DepartmentsEntity>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: DepartmentsState = {
  ids: [],
  entities: {},
  status: 'idle',
  error: null,
}

export const fetchDepartmentsList = createAsyncThunk(
  'departments/fetchList',
  async () => api.listDepartments(),
)

const departmentsSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartmentsList.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchDepartmentsList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const normalized = normalizeEntities(action.payload)
        state.ids = normalized.ids
        state.entities = normalized.entities as Record<string, DepartmentsEntity>
      })
      .addCase(fetchDepartmentsList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to load'
      })
  },
})

export const departmentsReducer = departmentsSlice.reducer
export const selectdepartmentsState = (state: RootState): DepartmentsState => state.departments
