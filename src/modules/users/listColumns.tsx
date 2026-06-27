import { Badge } from '@/components/ui/badge'
import type { EntityListExtraColumn } from '@/components/EntityListPage'
import type { UsersEntity } from './types'

function asUser(item: { id: string; name: string; status: string }): UsersEntity {
  return item as UsersEntity
}

export const USER_LIST_COLUMNS: EntityListExtraColumn[] = [
  { header: 'First Name', cell: (item) => asUser(item).firstName ?? '—' },
  { header: 'Last Name', cell: (item) => asUser(item).lastName ?? '—' },
  { header: 'Email', cell: (item) => asUser(item).email ?? '—' },
  { header: 'Role', cell: (item) => asUser(item).role ?? '—' },
  {
    header: 'Verified',
    cell: (item) => {
      const verified = asUser(item).emailVerified === true
      return (
        <Badge variant={verified ? 'default' : 'secondary'}>{verified ? 'Yes' : 'No'}</Badge>
      )
    },
  },
]
