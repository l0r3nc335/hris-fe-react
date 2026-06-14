import { queryKeys } from '@/lib/queryKeys'
import { notificationsApi } from '@/services/api/notificationsApi'
import { createResourceQueryHooks } from '../factory'

const hooks = createResourceQueryHooks(queryKeys.notifications, notificationsApi)

export const useNotificationsList = hooks.useList
export const useNotificationsTrashedList = hooks.useTrashedList
export const useCreateNotification = hooks.useCreate
export const useUpdateNotification = hooks.useUpdate
export const useSoftDeleteNotification = hooks.useSoftDelete
export const useRestoreNotification = hooks.useRestore
export const useRemoveNotification = hooks.useRemove