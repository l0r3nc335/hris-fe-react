import { createSelector } from '@reduxjs/toolkit'
import { selectdepartmentsState } from './departmentsSlice'
import type { DepartmentsEntity } from '@/modules/departments/types'

export const selectdepartmentsList = createSelector([selectdepartmentsState], (state): DepartmentsEntity[] =>
  state.ids.map((id) => state.entities[id]).filter((e): e is DepartmentsEntity => Boolean(e)),
)

export const selectdepartmentsStatus = createSelector([selectdepartmentsState], (s) => s.status)
