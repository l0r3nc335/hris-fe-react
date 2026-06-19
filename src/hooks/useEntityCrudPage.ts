import { useState } from 'react'
import type { UseQueryResult } from '@tanstack/react-query'
import type { EntityFormValues, FormFieldConfig } from '@/components/EntityFormDialog'
import type { EntityListPageProps } from '@/components/EntityListPage'
import type { ConfirmDialogProps } from '@/components/ConfirmDialog'
import type { CreateBody, UpdateBody } from '@/services/api/client'
import type { Permission } from '@/constants/permissions'

interface EntityListItem {
  id: string
  name: string
  status: string
}

type ListQueryResult = Pick<UseQueryResult<EntityListItem[]>, 'data' | 'isLoading'>

interface MutationHookResult<TVariables> {
  mutate: (variables: TVariables) => void
  isPending: boolean
}

export interface EntityCrudHooks {
  useList: () => ListQueryResult
  useTrashedList: () => ListQueryResult
  useCreate: () => MutationHookResult<CreateBody>
  useUpdate: () => MutationHookResult<{ id: string; body: UpdateBody }>
  useSoftDelete: () => MutationHookResult<string>
  useRestore: () => MutationHookResult<string>
  useRemove: () => MutationHookResult<string>
}

export interface UseEntityCrudPageConfig {
  title: string
  description: string
  emptyTitle: string
  entitySingular: string
  readOnly?: boolean
  formFields?: FormFieldConfig[]
  statusOptions?: import('@/ui/Select').SelectOption[]
  createPermission?: Permission
  writePermission?: Permission
  hooks: EntityCrudHooks | (Pick<EntityCrudHooks, 'useList'> & Partial<Omit<EntityCrudHooks, 'useList'>>)
}

type ConfirmAction = 'softDelete' | 'hardDelete' | 'restore'

export interface UseEntityCrudPageResult {
  listPageProps: EntityListPageProps
  formDialogProps: {
    open: boolean
    onOpenChange: (open: boolean) => void
    mode: 'create' | 'edit'
    title: string
    initialValues?: EntityFormValues
    onSubmit: (data: EntityFormValues) => void
    isPending: boolean
    formFields?: FormFieldConfig[]
    statusOptions?: import('@/ui/Select').SelectOption[]
  }
  confirmDialogProps: ConfirmDialogProps
}

export function useEntityCrudPage(config: UseEntityCrudPageConfig): UseEntityCrudPageResult {
  const {
    title,
    description,
    emptyTitle,
    entitySingular,
    readOnly = false,
    formFields = [],
    statusOptions,
    createPermission,
    writePermission,
  } = config
  const [showDeleted, setShowDeleted] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')
  const [editingItem, setEditingItem] = useState<EntityListItem | null>(null)
  const [confirmAction, setConfirmAction] = useState<{
    action: ConfirmAction
    id: string
  } | null>(null)

  const activeQuery = config.hooks.useList()
  const trashedQuery = config.hooks.useTrashedList?.() ?? { data: undefined, isLoading: false }
  const createMutation = config.hooks.useCreate?.() ?? { mutate: () => undefined, isPending: false }
  const updateMutation = config.hooks.useUpdate?.() ?? { mutate: () => undefined, isPending: false }
  const softDeleteMutation = config.hooks.useSoftDelete?.() ?? { mutate: () => undefined, isPending: false }
  const restoreMutation = config.hooks.useRestore?.() ?? { mutate: () => undefined, isPending: false }
  const removeMutation = config.hooks.useRemove?.() ?? { mutate: () => undefined, isPending: false }

  const items = (showDeleted ? trashedQuery.data : activeQuery.data) ?? []
  const isLoading = showDeleted ? trashedQuery.isLoading : activeQuery.isLoading

  const openCreate = (): void => {
    setFormMode('create')
    setEditingItem(null)
    setFormOpen(true)
  }

  const openEdit = (item: EntityListItem): void => {
    setFormMode('edit')
    setEditingItem(item)
    setFormOpen(true)
  }

  const toApiBody = (data: EntityFormValues): CreateBody & UpdateBody => {
    const body: CreateBody & UpdateBody = {
      name: data.name,
      status: data.status,
    }
    for (const field of formFields) {
      const value = data[field.key]
      if (value) body[field.key] = value
    }
    return body
  }

  const handleFormSubmit = (data: EntityFormValues): void => {
    const body = toApiBody(data)
    if (formMode === 'create') {
      createMutation.mutate(body)
      return
    }
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, body })
    }
  }

  const handleConfirm = (): void => {
    if (!confirmAction) return
    const { action, id } = confirmAction
    if (action === 'softDelete') {
      softDeleteMutation.mutate(id)
    } else if (action === 'restore') {
      restoreMutation.mutate(id)
    } else {
      removeMutation.mutate(id)
    }
    setConfirmAction(null)
  }

  const confirmCopy: Record<
    ConfirmAction,
    { title: string; description: string; confirmLabel: string; destructive: boolean }
  > = {
    softDelete: {
      title: `Delete ${entitySingular}?`,
      description: `This will move the ${entitySingular} to trash. You can restore it later.`,
      confirmLabel: 'Soft delete',
      destructive: false,
    },
    hardDelete: {
      title: `Permanently delete ${entitySingular}?`,
      description: `This action cannot be undone. The ${entitySingular} will be permanently removed.`,
      confirmLabel: 'Permanently delete',
      destructive: true,
    },
    restore: {
      title: `Restore ${entitySingular}?`,
      description: `This will restore the ${entitySingular} from trash.`,
      confirmLabel: 'Restore',
      destructive: false,
    },
  }

  const pendingConfirm =
    confirmAction?.action === 'softDelete'
      ? softDeleteMutation.isPending
      : confirmAction?.action === 'restore'
        ? restoreMutation.isPending
        : removeMutation.isPending

  const activeConfirm = confirmAction ? confirmCopy[confirmAction.action] : null

  return {
    listPageProps: {
      title,
      description,
      emptyTitle: showDeleted ? `No deleted ${entitySingular}s found` : emptyTitle,
      items,
      isLoading,
      showDeleted,
      onShowDeletedChange: readOnly ? undefined : setShowDeleted,
      onCreate: readOnly ? undefined : openCreate,
      onEdit: readOnly || showDeleted ? undefined : openEdit,
      onSoftDelete:
        readOnly || showDeleted
          ? undefined
          : (id) => setConfirmAction({ action: 'softDelete', id }),
      onHardDelete: readOnly
        ? undefined
        : (id) => setConfirmAction({ action: 'hardDelete', id }),
      onRestore:
        readOnly || !showDeleted
          ? undefined
          : (id) => setConfirmAction({ action: 'restore', id }),
      showActions: !readOnly,
      isTrashedView: showDeleted,
      createPermission,
      writePermission,
    },
    formDialogProps: {
      open: formOpen,
      onOpenChange: setFormOpen,
      mode: formMode,
      title: formMode === 'create' ? `Create ${entitySingular}` : `Edit ${entitySingular}`,
      initialValues: editingItem
        ? { name: editingItem.name, status: editingItem.status }
        : undefined,
      onSubmit: handleFormSubmit,
      isPending:
        formMode === 'create' ? createMutation.isPending : updateMutation.isPending,
      formFields,
      statusOptions,
    },
    confirmDialogProps: {
      open: confirmAction !== null,
      onOpenChange: (open) => {
        if (!open) setConfirmAction(null)
      },
      title: activeConfirm?.title ?? '',
      description: activeConfirm?.description ?? '',
      confirmLabel: activeConfirm?.confirmLabel,
      destructive: activeConfirm?.destructive,
      onConfirm: handleConfirm,
      isPending: pendingConfirm,
    },
  }
}
