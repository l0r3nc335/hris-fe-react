import type { BaseEntity } from '@/types'

export interface NotificationItem extends BaseEntity {
  name: string
  status: string
  title: string
  message: string
  read: boolean
  type: 'notification' | 'message'
}

export interface InboxMessage {
  id: string
  from: string
  subject: string
  read: boolean
}

export interface NotificationsEntity extends BaseEntity {
  name: string
  status: string
}
