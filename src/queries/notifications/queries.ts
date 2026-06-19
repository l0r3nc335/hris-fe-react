import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/queryKeys'
import { notificationsApi } from '@/services/api/notificationsApi'
import {
  fetchUnreadNotifications,
  fetchMessagesInbox,
  markNotificationRead,
  markAllNotificationsRead,
} from '@/services/api/notificationsApi'
import { createResourceQueryHooks } from '../factory'

const hooks = createResourceQueryHooks(queryKeys.notifications, notificationsApi)

export const useNotificationsList = hooks.useList
export const useNotificationsTrashedList = hooks.useTrashedList
export const useCreateNotification = hooks.useCreate
export const useUpdateNotification = hooks.useUpdate
export const useSoftDeleteNotification = hooks.useSoftDelete
export const useRestoreNotification = hooks.useRestore
export const useRemoveNotification = hooks.useRemove

export function useUnreadNotifications() {
  return useQuery({
    queryKey: queryKeys.notificationsUnread.list(),
    queryFn: fetchUnreadNotifications,
  })
}

export function useMessagesInbox() {
  return useQuery({
    queryKey: queryKeys.messages.inbox(),
    queryFn: fetchMessagesInbox,
  })
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: markNotificationRead,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.notificationsUnread.all })
      void queryClient.invalidateQueries({ queryKey: queryKeys.messages.all })
    },
  })
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.notificationsUnread.all })
      void queryClient.invalidateQueries({ queryKey: queryKeys.messages.all })
    },
  })
}
