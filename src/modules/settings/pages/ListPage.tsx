import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import {
  useSettingsList,
  useSettingsTrashedList,
  useCreateSettings,
  useUpdateSettings,
  useSoftDeleteSettings,
  useRestoreSettings,
  useRemoveSettings,
} from '../hooks'

export function SettingsListPage(): React.JSX.Element {
  const crud = useEntityCrudPage({
    title: 'Settings',
    description: 'Manage settings records',
    emptyTitle: 'No settings found',
    entitySingular: 'setting',
    hooks: {
      useList: useSettingsList,
      useTrashedList: useSettingsTrashedList,
      useCreate: useCreateSettings,
      useUpdate: useUpdateSettings,
      useSoftDelete: useSoftDeleteSettings,
      useRestore: useRestoreSettings,
      useRemove: useRemoveSettings,
    },
  })

  return (
    <>
      <EntityListPage {...crud.listPageProps} />
      <EntityFormDialog {...crud.formDialogProps} />
      <ConfirmDialog {...crud.confirmDialogProps} />
    </>
  )
}