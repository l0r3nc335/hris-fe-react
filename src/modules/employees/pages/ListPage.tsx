import { PageHeader } from '@/components/PageHeader'
import { EmptyState } from '@/components/EmptyState'
import { PageLoader } from '@/components/PageLoader'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui'
import { useEmployeesList } from '../hooks'

export function EmployeesListPage(): React.JSX.Element {
  const { items, status } = useEmployeesList()

  if (status === 'loading') return <PageLoader />
  if (items.length === 0) return <EmptyState title="No employees found" />

  return (
    <div>
      <PageHeader title="Employees" description="Manage employees records" />
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
