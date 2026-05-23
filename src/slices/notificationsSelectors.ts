import { createSelector } from '@reduxjs/toolkit'
import { selectnotificationsState } from './notificationsSlice'
import type { NotificationsEntity } from '@/modules/notifications/types'

export const selectnotificationsList = createSelector([selectnotificationsState], (state): NotificationsEntity[] =>
  state.ids.map((id) => state.entities[id]).filter((e): e is NotificationsEntity => Boolean(e)),
)

export const selectnotificationsStatus = createSelector([selectnotificationsState], (s) => s.status)
