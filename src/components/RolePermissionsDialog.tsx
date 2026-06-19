import { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Modal, Button } from '@/ui'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/ui'
import { listPermissions, assignPermissionsToRole } from '@/services/api/permissionsApi'
import { queryKeys } from '@/lib/queryKeys'

export interface RolePermissionsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  roleId: string
  roleName: string
}

export function RolePermissionsDialog({
  open,
  onOpenChange,
  roleId,
  roleName,
}: RolePermissionsDialogProps): React.JSX.Element {
  const queryClient = useQueryClient()
  const [selected, setSelected] = useState<string[]>([])

  const { data: permissions = [], isLoading } = useQuery({
    queryKey: queryKeys.permissions.list(),
    queryFn: listPermissions,
    enabled: open,
  })

  useEffect(() => {
    if (open) setSelected([])
  }, [open, roleId])

  const assignMutation = useMutation({
    mutationFn: (permissionIds: string[]) => assignPermissionsToRole(roleId, permissionIds),
    onSuccess: () => {
      toast.success('Permissions updated')
      void queryClient.invalidateQueries({ queryKey: queryKeys.roles.all })
      onOpenChange(false)
    },
  })

  const togglePermission = (id: string, checked: boolean): void => {
    setSelected((prev) =>
      checked ? [...prev, id] : prev.filter((p) => p !== id),
    )
  }

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={`Permissions for ${roleName}`}
      description="Select permissions to assign to this role."
      footer={
        <>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => assignMutation.mutate(selected)}
            disabled={assignMutation.isPending}
          >
            {assignMutation.isPending ? 'Saving...' : 'Save permissions'}
          </Button>
        </>
      }
    >
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading permissions...</p>
      ) : (
        <div className="max-h-64 space-y-3 overflow-y-auto">
          {permissions.map((permission) => (
            <div key={permission.id} className="flex items-start gap-2">
              <Checkbox
                id={`perm-${permission.id}`}
                checked={selected.includes(permission.id)}
                onCheckedChange={(checked) =>
                  togglePermission(permission.id, checked === true)
                }
              />
              <div>
                <Label htmlFor={`perm-${permission.id}`} className="font-medium">
                  {permission.code}
                </Label>
                <p className="text-xs text-muted-foreground">{permission.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  )
}
