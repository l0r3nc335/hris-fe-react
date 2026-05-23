import { PageHeader } from '@/components/PageHeader'
import { EmptyState } from '@/components/EmptyState'
import { PageLoader } from '@/components/PageLoader'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui'
import { useNotificationsList } from '../hooks'

export function NotificationsListPage(): React.JSX.Element {
  const { items, status } = useNotificationsList()

  if (status === 'loading') return <PageLoader />
  if (items.length === 0) return <EmptyState title="No notifications found" />

  return (
    <div>
      <PageHeader title="Notifications" description="Manage notifications records" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
