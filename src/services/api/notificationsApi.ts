import { endpoints } from '@/constants/endpoints'
import { apiGet, apiPost } from './client'
import type { InboxMessage, NotificationItem } from '@/modules/notifications/types'
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

export function fetchUnreadNotifications(): Promise<NotificationItem[]> {
  return apiGet<Array<{
    id: string
    tenantId?: string
    title: string
    message: string
    read: boolean
    status: string
  }>>(endpoints.notifications.recent).then((items) =>
    items.map((item) => ({
      id: item.id,
      tenantId: item.tenantId ?? '',
      name: item.title,
      title: item.title,
      message: item.message,
      read: item.read,
      status: item.status,
      type: 'notification' as const,
      createdAt: '',
      updatedAt: '',
    })),
  )
}

export function fetchMessagesInbox(): Promise<InboxMessage[]> {
  return apiGet<InboxMessage[]>(endpoints.messages.inbox)
}

export function markNotificationRead(id: string): Promise<void> {
  return apiPost<void>(endpoints.notifications.markRead, { ids: [id] })
}

export function markAllNotificationsRead(): Promise<void> {
  return apiPost<void>(endpoints.notifications.markAllRead)
}
