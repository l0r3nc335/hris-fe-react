import { PageHeader } from '@/components/PageHeader'
import { EmptyState } from '@/components/EmptyState'
import { PageLoader } from '@/components/PageLoader'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui'
import { useInterviewsList } from '../hooks'

export function InterviewsListPage(): React.JSX.Element {
  const { items, status } = useInterviewsList()

  if (status === 'loading') return <PageLoader />
  if (items.length === 0) return <EmptyState title="No interviews found" />

  return (
    <div>
      <PageHeader title="Interviews" description="Manage interviews records" />
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
