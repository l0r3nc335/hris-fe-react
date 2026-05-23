import { PageHeader } from '@/components/PageHeader'
import { EmptyState } from '@/components/EmptyState'
import { PageLoader } from '@/components/PageLoader'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui'
import { useSettingsList } from '../hooks'

export function SettingsListPage(): React.JSX.Element {
  const { items, status } = useSettingsList()

  if (status === 'loading') return <PageLoader />
  if (items.length === 0) return <EmptyState title="No settings found" />

  return (
    <div>
      <PageHeader title="Settings" description="Manage settings records" />
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
