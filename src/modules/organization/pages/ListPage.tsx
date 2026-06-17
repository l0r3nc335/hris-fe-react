import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { PageShell } from '@/components/layout/PageShell'
import { OrgChartTree } from '@/components/OrgChartTree'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import {
  useOrganizationList,
  useOrganizationTrashedList,
  useCreateOrganization,
  useUpdateOrganization,
  useSoftDeleteOrganization,
  useRestoreOrganization,
  useRemoveOrganization,
  useOrgChartTreeQuery,
} from '../hooks'

export function OrganizationListPage(): React.JSX.Element {
  const { data: tree = [], isLoading: treeLoading } = useOrgChartTreeQuery()

  const crud = useEntityCrudPage({
    title: 'Organization',
    description: 'View org chart and manage organization nodes',
    emptyTitle: 'No organization nodes found',
    entitySingular: 'org node',
    hooks: {
      useList: useOrganizationList,
      useTrashedList: useOrganizationTrashedList,
      useCreate: useCreateOrganization,
      useUpdate: useUpdateOrganization,
      useSoftDelete: useSoftDeleteOrganization,
      useRestore: useRestoreOrganization,
      useRemove: useRemoveOrganization,
    },
  })

  return (
    <PageShell title="Organization" description="View org chart and manage organization nodes">
      <Tabs defaultValue="chart">
        <TabsList>
          <TabsTrigger value="chart">Org Chart</TabsTrigger>
          <TabsTrigger value="list">Node List</TabsTrigger>
        </TabsList>
        <TabsContent value="chart" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Organization Structure</CardTitle>
            </CardHeader>
            <CardContent>
              {treeLoading ? (
                <p className="text-sm text-muted-foreground">Loading org chart...</p>
              ) : (
                <OrgChartTree nodes={tree} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="list" className="mt-4">
          <EntityListPage {...crud.listPageProps} title="" description="" embedded />
          <EntityFormDialog {...crud.formDialogProps} />
          <ConfirmDialog {...crud.confirmDialogProps} />
        </TabsContent>
      </Tabs>
    </PageShell>
  )
}
