import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { PageShell } from '@/components/layout/PageShell'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
    description: 'Configure company and system settings',
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
    <PageShell title="Settings" description="Configure company and system settings">
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="leave-types">Leave Types</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="mt-4">
          <EntityListPage {...crud.listPageProps} title="" description="" embedded />
        </TabsContent>
        <TabsContent value="company" className="mt-4">
          <EntityListPage
            {...crud.listPageProps}
            title=""
            description=""
            emptyTitle="No company settings configured"
            embedded
          />
        </TabsContent>
        <TabsContent value="leave-types" className="mt-4">
          <EntityListPage
            {...crud.listPageProps}
            title=""
            description=""
            emptyTitle="No leave types configured"
            embedded
          />
        </TabsContent>
      </Tabs>
      <EntityFormDialog {...crud.formDialogProps} />
      <ConfirmDialog {...crud.confirmDialogProps} />
    </PageShell>
  )
}
