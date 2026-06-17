import { Link } from 'react-router-dom'
import { PageShell } from '@/components/layout/PageShell'
import { TableSkeleton } from '@/components/TableSkeleton'
import { EmptyState } from '@/components/EmptyState'
import { Button } from '@/ui'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui'
import { ROUTES } from '@/constants/routes'
import { usePermissionsCatalog } from '../hooks'

export function PermissionsListPage(): React.JSX.Element {
  const { data: permissions = [], isLoading } = usePermissionsCatalog()

  return (
    <PageShell
      title="Permissions"
      description="Read-only catalog of system permissions. Assign permissions to roles."
    >
      <div className="mb-4">
        <Button variant="outline" asChild>
          <Link to={ROUTES.roles}>Manage role assignments</Link>
        </Button>
      </div>
      {isLoading ? (
        <TableSkeleton />
      ) : permissions.length === 0 ? (
        <EmptyState title="No permissions found" />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissions.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell className="font-medium">{permission.code}</TableCell>
                <TableCell>{permission.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </PageShell>
  )
}
