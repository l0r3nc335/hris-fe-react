import { queryKeys } from '@/lib/queryKeys'
import { listPermissions } from '@/services/api/permissionsApi'
import { useQuery } from '@tanstack/react-query'

export function usePermissionsCatalog() {
  return useQuery({
    queryKey: queryKeys.permissions.list(),
    queryFn: listPermissions,
  })
}
