import { useMemo } from 'react'
import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { PageShell } from '@/components/layout/PageShell'
import { Tabs } from '@/ui'
import { PERMISSIONS } from '@/constants/permissions'
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

const SETTINGS_CATEGORIES = [
  { value: 'general', label: 'General' },
  { value: 'company', label: 'Company' },
  { value: 'leave-types', label: 'Leave Types' },
]

export function SettingsListPage(): React.JSX.Element {
  const crud = useEntityCrudPage({
    title: 'Settings',
    description: 'Configure company and system settings',
    emptyTitle: 'No settings found',
    entitySingular: 'setting',
    writePermission: PERMISSIONS.settingsWrite,
    createPermission: PERMISSIONS.settingsWrite,
    statusOptions: SETTINGS_CATEGORIES,
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

  const tabItems = useMemo(
    () =>
      SETTINGS_CATEGORIES.map((category) => ({
        value: category.value,
        label: category.label,
        content: (
          <EntityListPage
            {...crud.listPageProps}
            title=""
            description=""
            items={crud.listPageProps.items.filter(
              (item) => item.status === category.value,
            )}
            emptyTitle={`No ${category.label.toLowerCase()} settings configured`}
            embedded
          />
        ),
      })),
    [crud.listPageProps],
  )

  return (
    <PageShell title="Settings" description="Configure company and system settings">
      <Tabs defaultValue="general" items={tabItems} />
      <EntityFormDialog {...crud.formDialogProps} />
      <ConfirmDialog {...crud.confirmDialogProps} />
    </PageShell>
  )
}
