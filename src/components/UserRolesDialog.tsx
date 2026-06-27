import { useEffect, useMemo, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { X } from 'lucide-react'
import { toast } from 'sonner'
import { Modal, Button, Select } from '@/ui'
import { Badge } from '@/components/ui/badge'
import { listRoles } from '@/services/api/rolesApi'
import { assignRolesToUser, getUserRoles } from '@/services/api/usersApi'
import { queryKeys } from '@/lib/queryKeys'

export interface UserRolesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userId: string
  userName: string
}

export function UserRolesDialog({
  open,
  onOpenChange,
  userId,
  userName,
}: UserRolesDialogProps): React.JSX.Element {
  const queryClient = useQueryClient()
  const [selected, setSelected] = useState<string[]>([])
  const [addSelectKey, setAddSelectKey] = useState(0)

  const { data: rolesResponse, isLoading: isLoadingRoles } = useQuery({
    queryKey: queryKeys.roles.list(),
    queryFn: () => listRoles({ page: 1, limit: 100 }),
    enabled: open,
  })

  const { data: assignedRoles, isLoading: isLoadingAssigned } = useQuery({
    queryKey: queryKeys.users.roles(userId),
    queryFn: () => getUserRoles(userId),
    enabled: open,
  })

  const roles = rolesResponse?.data ?? []

  useEffect(() => {
    if (!open) return
    setAddSelectKey((key) => key + 1)
  }, [open, userId])

  useEffect(() => {
    if (!open || assignedRoles === undefined) return
    setSelected(assignedRoles.map((role) => role.id))
  }, [open, userId, assignedRoles])

  const assignMutation = useMutation({
    mutationFn: (roleIds: string[]) => assignRolesToUser(userId, roleIds),
    onSuccess: () => {
      toast.success('User roles updated')
      void queryClient.invalidateQueries({ queryKey: queryKeys.users.all })
      void queryClient.invalidateQueries({ queryKey: queryKeys.users.roles(userId) })
      onOpenChange(false)
    },
  })

  const removeRole = (roleId: string): void => {
    setSelected((prev) => prev.filter((id) => id !== roleId))
  }

  const handleAddRole = (roleId: string): void => {
    setSelected((prev) => (prev.includes(roleId) ? prev : [...prev, roleId]))
    setAddSelectKey((key) => key + 1)
  }

  const roleById = useMemo(
    () => new Map(roles.map((role) => [role.id, role])),
    [roles],
  )

  const availableOptions = useMemo(
    () =>
      roles
        .filter((role) => !selected.includes(role.id))
        .map((role) => ({ value: role.id, label: role.name })),
    [roles, selected],
  )

  const loading = isLoadingRoles || isLoadingAssigned

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={`Roles for ${userName}`}
      description="Assign tenant roles to this user."
      footer={
        <>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => assignMutation.mutate(selected)}
            disabled={assignMutation.isPending || loading}
          >
            {assignMutation.isPending ? 'Saving...' : 'Save roles'}
          </Button>
        </>
      }
    >
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading roles...</p>
      ) : roles.length === 0 ? (
        <p className="text-sm text-muted-foreground">No roles available.</p>
      ) : (
        <div className="space-y-4">
          {availableOptions.length > 0 ? (
            <Select
              key={addSelectKey}
              onValueChange={handleAddRole}
              placeholder="Add role..."
              options={availableOptions}
            />
          ) : (
            <p className="text-sm text-muted-foreground">All roles assigned.</p>
          )}
          {selected.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selected.map((roleId) => {
                const role = roleById.get(roleId)
                const label = role?.name ?? assignedRoles?.find((r) => r.id === roleId)?.name ?? roleId
                return (
                  <Badge key={roleId} variant="secondary" className="gap-1 pr-1">
                    {label}
                    <button
                      type="button"
                      onClick={() => removeRole(roleId)}
                      className="rounded-full p-0.5 hover:bg-muted-foreground/20"
                      aria-label={`Remove ${label}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No roles assigned yet.</p>
          )}
        </div>
      )}
    </Modal>
  )
}
