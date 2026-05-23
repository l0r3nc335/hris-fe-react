import { PageHeader } from '@/components/PageHeader'
import { EmptyState } from '@/components/EmptyState'
import { PageLoader } from '@/components/PageLoader'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui'
import { useAuditList } from '../hooks'

export function AuditListPage(): React.JSX.Element {
  const { items, status } = useAuditList()

  if (status === 'loading') return <PageLoader />
  if (items.length === 0) return <EmptyState title="No audit logs found" />

  return (
    <div>
      <PageHeader title="Audit Logs" description="Manage audit logs records" />
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
