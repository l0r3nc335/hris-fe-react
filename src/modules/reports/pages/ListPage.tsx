import { EntityListPage } from '@/components/EntityListPage'
import { useReportsList } from '../hooks'

export function ReportsListPage(): React.JSX.Element {
  const { data: items = [], isLoading } = useReportsList()

  return (
    <EntityListPage
      title='Reports'
      description='View report records'
      emptyTitle='No reports found'
      items={items}
      isLoading={isLoading}
      showActions={false}
    />
  )
}