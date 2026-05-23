import { PageHeader } from '@/components/PageHeader'
import { EmptyState } from '@/components/EmptyState'
import { PageLoader } from '@/components/PageLoader'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui'
import { usePositionsList } from '../hooks'

export function PositionsListPage(): React.JSX.Element {
  const { items, status } = usePositionsList()

  if (status === 'loading') return <PageLoader />
  if (items.length === 0) return <EmptyState title="No positions found" />

  return (
    <div>
      <PageHeader title="Positions" description="Manage positions records" />
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
