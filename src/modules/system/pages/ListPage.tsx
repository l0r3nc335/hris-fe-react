import { EntityListPage } from '@/components/EntityListPage'
import { useSystemList } from '../hooks'

export function SystemListPage(): React.JSX.Element {
  const { data: items = [], isLoading } = useSystemList()

  return (
    <EntityListPage
      title='System'
      description='View system health records'
      emptyTitle='No system records found'
      items={items}
      isLoading={isLoading}
      showActions={false}
    />
  )
}