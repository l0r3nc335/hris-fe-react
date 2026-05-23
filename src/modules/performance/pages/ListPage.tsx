import { PageHeader } from '@/components/PageHeader'
import { EmptyState } from '@/components/EmptyState'
import { PageLoader } from '@/components/PageLoader'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui'
import { usePerformanceList } from '../hooks'

export function PerformanceListPage(): React.JSX.Element {
  const { items, status } = usePerformanceList()

  if (status === 'loading') return <PageLoader />
  if (items.length === 0) return <EmptyState title="No performance found" />

  return (
    <div>
      <PageHeader title="Performance" description="Manage performance records" />
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
