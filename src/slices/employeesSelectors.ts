import { createSelector } from '@reduxjs/toolkit'
import { selectemployeesState } from './employeesSlice'
import type { EmployeesEntity } from '@/modules/employees/types'

export const selectemployeesList = createSelector([selectemployeesState], (state): EmployeesEntity[] =>
  state.ids.map((id: string) => state.entities[id]).filter((e): e is EmployeesEntity => Boolean(e)),
)

export const selectemployeesStatus = createSelector([selectemployeesState], (s) => s.status)
