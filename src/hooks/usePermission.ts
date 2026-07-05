import { useCallback } from 'react'
import { useAppSelector } from '@/hooks'
import { selectUser } from '@/slices/authSlice'
import { PERMISSIONS, type Permission } from '@/constants/permissions'

const SUBSCRIBER_PERMISSIONS = new Set<Permission>([
  PERMISSIONS.mySubscriptionRead,
  PERMISSIONS.billingInvoicesRead,
])

export function usePermission(): { can: (permission: Permission) => boolean; permissions: string[] } 
{
  const user = useAppSelector(selectUser)
  const permissions = user?.permissions ?? []

  const can = useCallback(
    (permission: Permission): boolean => {
      if (!user) return false
      if (user.role === 'admin' || user.role === 'superadmin') return true
      if (user.role === 'subscriber' && SUBSCRIBER_PERMISSIONS.has(permission)) return true
      return permissions.includes(permission)
    },
    [permissions, user],
  )

  return { can, permissions }
}
