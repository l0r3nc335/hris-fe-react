import { endpoints } from '@/constants/endpoints'
import { createMutableResourceApi } from './client'
import type { NotificationsEntity } from '@/modules/notifications/types'

const api = createMutableResourceApi<NotificationsEntity>({
  list: endpoints.notifications.list,
  byId: endpoints.notifications.byId,
  trashed: endpoints.notifications.trashed,
  softDelete: endpoints.notifications.softDelete,
  restore: endpoints.notifications.restore,
})

export const listNotifications = api.list
export const getNotifications = api.getById
export const notificationsApi = api
