import { useEffect, useState } from 'react'
import { EntityListPage } from '@/components/EntityListPage'
import { useAuditList } from '../hooks'
import type { ListQueryParams } from '@/services/api/client'

export function AuditListPage(): React.JSX.Element {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const listParams: ListQueryParams = {
    page,
    limit,
    q: searchQuery.trim() || undefined,
    status: statusFilter,
  }

  const { data: items = [], meta, isLoading } = useAuditList(listParams)

  useEffect(() => {
    setPage(1)
  }, [searchQuery, statusFilter])

  return (
    <EntityListPage
      title='Audit Logs'
      description='View audit log records'
      emptyTitle='No audit logs found'
      items={items}
      isLoading={isLoading}
      showActions={false}
      total={meta?.total ?? 0}
      page={page}
      limit={limit}
      onPageChange={setPage}
      onLimitChange={(nextLimit) => {
        setLimit(nextLimit)
        setPage(1)
      }}
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
      statusFilter={statusFilter}
      onStatusFilterChange={setStatusFilter}
    />
  )
}
