import { createSelector } from '@reduxjs/toolkit'
import { selectattendanceState } from './attendanceSlice'
import type { AttendanceEntity } from '@/modules/attendance/types'

export const selectattendanceList = createSelector([selectattendanceState], (state): AttendanceEntity[] =>
  state.ids.map((id) => state.entities[id]).filter((e): e is AttendanceEntity => Boolean(e)),
)

export const selectattendanceStatus = createSelector([selectattendanceState], (s) => s.status)
