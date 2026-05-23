import { createSelector } from '@reduxjs/toolkit'
import { selectusersState } from './usersSlice'
import type { UsersEntity } from '@/modules/users/types'

export const selectusersList = createSelector([selectusersState], (state): UsersEntity[] =>
  state.ids.map((id) => state.entities[id]).filter((e): e is UsersEntity => Boolean(e)),
)

export const selectusersStatus = createSelector([selectusersState], (s) => s.status)
