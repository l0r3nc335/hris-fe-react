import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import {
  usePerformanceList,
  usePerformanceTrashedList,
  useCreatePerformance,
  useUpdatePerformance,
  useSoftDeletePerformance,
  useRestorePerformance,
  useRemovePerformance,
} from '../hooks'

export function PerformanceListPage(): React.JSX.Element {
  const crud = useEntityCrudPage({
    title: 'Performance',
    description: 'Manage performance records',
    emptyTitle: 'No performance found',
    entitySingular: 'performance review',
    hooks: {
      useList: usePerformanceList,
      useTrashedList: usePerformanceTrashedList,
      useCreate: useCreatePerformance,
      useUpdate: useUpdatePerformance,
      useSoftDelete: useSoftDeletePerformance,
      useRestore: useRestorePerformance,
      useRemove: useRemovePerformance,
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