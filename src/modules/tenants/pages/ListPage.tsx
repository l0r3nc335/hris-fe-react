import { PageHeader } from '@/components/PageHeader'
import { EmptyState } from '@/components/EmptyState'
import { PageLoader } from '@/components/PageLoader'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui'
import { useTenantsList } from '../hooks'

export function TenantsListPage(): React.JSX.Element {
  const { items, status } = useTenantsList()

  if (status === 'loading') return <PageLoader />
  if (items.length === 0) return <EmptyState title="No tenants found" />

  return (
    <div>
      <PageHeader title="Tenants" description="Manage tenants records" />
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
