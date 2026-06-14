import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import {
  useBillingList,
  useBillingTrashedList,
  useCreateBilling,
  useUpdateBilling,
  useSoftDeleteBilling,
  useRestoreBilling,
  useRemoveBilling,
} from '../hooks'

export function BillingListPage(): React.JSX.Element {
  const crud = useEntityCrudPage({
    title: 'Billing',
    description: 'Manage billing records',
    emptyTitle: 'No billing found',
    entitySingular: 'invoice',
    hooks: {
      useList: useBillingList,
      useTrashedList: useBillingTrashedList,
      useCreate: useCreateBilling,
      useUpdate: useUpdateBilling,
      useSoftDelete: useSoftDeleteBilling,
      useRestore: useRestoreBilling,
      useRemove: useRemoveBilling,
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