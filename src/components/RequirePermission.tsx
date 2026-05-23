import type { Permission } from '@/constants/permissions'
import { usePermission } from '@/hooks/usePermission'

export function RequirePermission({
  permission,
  children,
  fallback = null,
}: {
  permission: Permission
  children: React.ReactNode
  fallback?: React.ReactNode
}): React.JSX.Element | null {
  const { can } = usePermission()
  if (!can(permission)) return <>{fallback}</>
  return <>{children}</>
}
