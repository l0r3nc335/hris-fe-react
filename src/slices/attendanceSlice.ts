import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '@/services/api/attendanceApi'
import type { AttendanceEntity } from '@/modules/attendance/types'
import type { RootState } from '@/store'
import { normalizeEntities } from '@/utils/normalize'

export interface AttendanceState {
  ids: string[]
  entities: Record<string, AttendanceEntity>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: AttendanceState = {
  ids: [],
  entities: {},
  status: 'idle',
  error: null,
}

export const fetchAttendanceList = createAsyncThunk(
  'attendance/fetchList',
  async () => api.listAttendance(),
)

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendanceList.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchAttendanceList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const normalized = normalizeEntities(action.payload)
        state.ids = normalized.ids
        state.entities = normalized.entities as Record<string, AttendanceEntity>
      })
      .addCase(fetchAttendanceList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to load'
      })
  },
})

export const attendanceReducer = attendanceSlice.reducer
export const selectattendanceState = (state: RootState): AttendanceState => state.attendance
