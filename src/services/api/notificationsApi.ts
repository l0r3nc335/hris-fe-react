import { httpClient } from '@/services/httpClient'
import { endpoints } from '@/constants/endpoints'
import type { ApiResponse } from '@/types/api'
import type { NotificationsEntity } from '@/modules/notifications/types'

export async function listNotifications(): Promise<NotificationsEntity[]> {
  const res = await httpClient.get<ApiResponse<NotificationsEntity[]>>(endpoints.notifications.list)
  return res.data.data
}

export async function getNotifications(id: string): Promise<NotificationsEntity> {
  const res = await httpClient.get<ApiResponse<NotificationsEntity>>(endpoints.notifications.byId(id))
  return res.data.data
}
