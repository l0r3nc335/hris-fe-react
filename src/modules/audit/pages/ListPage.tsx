import { EntityListPage } from '@/components/EntityListPage'
import { useAuditList } from '../hooks'

export function AuditListPage(): React.JSX.Element {
  const { data: items = [], isLoading } = useAuditList()

  return (
    <EntityListPage
      title='Audit Logs'
      description='View audit log records'
      emptyTitle='No audit logs found'
      items={items}
      isLoading={isLoading}
      showActions={false}
    />
  )
}