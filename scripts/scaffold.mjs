import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve('src')

const domains = [
  { name: 'users', slice: 'users', api: 'usersApi', route: '/users', title: 'Users' },
  { name: 'employees', slice: 'employees', api: 'employeesApi', route: '/employees', title: 'Employees' },
  { name: 'departments', slice: 'departments', api: 'departmentsApi', route: '/departments', title: 'Departments' },
  { name: 'positions', slice: 'positions', api: 'positionsApi', route: '/positions', title: 'Positions' },
  { name: 'attendance', slice: 'attendance', api: 'attendanceApi', route: '/attendance', title: 'Attendance' },
  { name: 'leave', slice: 'leave', api: 'leaveApi', route: '/leave', title: 'Leave' },
  { name: 'payroll', slice: 'payroll', api: 'payrollApi', route: '/payroll', title: 'Payroll' },
  { name: 'compensation', slice: 'compensation', api: 'compensationApi', route: '/compensation', title: 'Compensation' },
  { name: 'timeTracking', slice: 'timeTracking', api: 'timeLogsApi', route: '/time-tracking', title: 'Time Tracking' },
  { name: 'recruitment', slice: 'recruitment', api: 'recruitmentApi', route: '/recruitment', title: 'Recruitment' },
  { name: 'interviews', slice: 'interviews', api: 'interviewsApi', route: '/interviews', title: 'Interviews' },
  { name: 'performance', slice: 'performance', api: 'performanceApi', route: '/performance', title: 'Performance' },
  { name: 'organization', slice: 'organization', api: 'orgApi', route: '/org-chart', title: 'Organization' },
  { name: 'documents', slice: 'documents', api: 'documentsApi', route: '/documents', title: 'Documents' },
  { name: 'notifications', slice: 'notifications', api: 'notificationsApi', route: '/notifications', title: 'Notifications' },
  { name: 'roles', slice: 'roles', api: 'rolesApi', route: '/roles', title: 'Roles' },
  { name: 'audit', slice: 'audit', api: 'auditApi', route: '/audit-logs', title: 'Audit Logs' },
  { name: 'reports', slice: 'reports', api: 'reportsApi', route: '/reports', title: 'Reports' },
  { name: 'analytics', slice: 'analytics', api: 'analyticsApi', route: '/analytics', title: 'Analytics' },
  { name: 'settings', slice: 'settings', api: 'settingsApi', route: '/settings', title: 'Settings' },
  { name: 'tenants', slice: 'tenants', api: 'tenantsApi', route: '/tenants', title: 'Tenants' },
  { name: 'billing', slice: 'billing', api: 'billingApi', route: '/billing', title: 'Billing' },
  { name: 'system', slice: 'system', api: 'systemApi', route: '/admin/health', title: 'System' },
]

function write(filePath, content) {
  const full = path.join(root, filePath)
  fs.mkdirSync(path.dirname(full), { recursive: true })
  fs.writeFileSync(full, content)
}

for (const d of domains) {
  const TypeName = d.slice.charAt(0).toUpperCase() + d.slice.slice(1) + 'Entity'
  write(
    `modules/${d.name}/types.ts`,
    `import type { BaseEntity } from '@/types'

export interface ${TypeName} extends BaseEntity {
  name: string
  status: string
}
`,
  )
  write(
    `modules/${d.name}/hooks.ts`,
    `import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetch${d.slice.charAt(0).toUpperCase() + d.slice.slice(1)}List } from '@/slices/${d.slice}Slice'
import { select${d.slice}List, select${d.slice}Status } from '@/slices/${d.slice}Selectors'

export function use${d.slice.charAt(0).toUpperCase() + d.slice.slice(1)}List(): {
  items: ReturnType<typeof select${d.slice}List>
  status: ReturnType<typeof select${d.slice}Status>
} {
  const dispatch = useAppDispatch()
  const items = useAppSelector(select${d.slice}List)
  const status = useAppSelector(select${d.slice}Status)

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetch${d.slice.charAt(0).toUpperCase() + d.slice.slice(1)}List())
    }
  }, [dispatch, status])

  return { items, status }
}
`,
  )
  write(
    `modules/${d.name}/pages/ListPage.tsx`,
    `import { PageHeader } from '@/components/PageHeader'
import { EmptyState } from '@/components/EmptyState'
import { PageLoader } from '@/components/PageLoader'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui'
import { use${d.slice.charAt(0).toUpperCase() + d.slice.slice(1)}List } from '../hooks'

export function ${d.slice.charAt(0).toUpperCase() + d.slice.slice(1)}ListPage(): React.JSX.Element {
  const { items, status } = use${d.slice.charAt(0).toUpperCase() + d.slice.slice(1)}List()

  if (status === 'loading') return <PageLoader />
  if (items.length === 0) return <EmptyState title="No ${d.title.toLowerCase()} found" />

  return (
    <div>
      <PageHeader title="${d.title}" description="Manage ${d.title.toLowerCase()} records" />
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
`,
  )
  write(
    `services/api/${d.api}.ts`,
    `import { httpClient } from '@/services/httpClient'
import { endpoints } from '@/constants/endpoints'
import type { ApiResponse, Paginated } from '@/types/api'
import type { ${TypeName} } from '@/modules/${d.name}/types'

export async function list${d.slice.charAt(0).toUpperCase() + d.slice.slice(1)}(): Promise<${TypeName}[]> {
  const res = await httpClient.get<ApiResponse<${TypeName}[]>>(endpoints.${d.slice}.list)
  return res.data.data
}

export async function get${d.slice.charAt(0).toUpperCase() + d.slice.slice(1)}(id: string): Promise<${TypeName}> {
  const res = await httpClient.get<ApiResponse<${TypeName}>>(endpoints.${d.slice}.byId(id))
  return res.data.data
}
`,
  )
  write(
    `slices/${d.slice}Slice.ts`,
    `import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '@/services/api/${d.api}'
import type { ${TypeName} } from '@/modules/${d.name}/types'
import type { RootState } from '@/store'
import { normalizeEntities } from '@/utils/normalize'

export interface ${d.slice.charAt(0).toUpperCase() + d.slice.slice(1)}State {
  ids: string[]
  entities: Record<string, ${TypeName}>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: ${d.slice.charAt(0).toUpperCase() + d.slice.slice(1)}State = {
  ids: [],
  entities: {},
  status: 'idle',
  error: null,
}

export const fetch${d.slice.charAt(0).toUpperCase() + d.slice.slice(1)}List = createAsyncThunk(
  '${d.slice}/fetchList',
  async () => api.list${d.slice.charAt(0).toUpperCase() + d.slice.slice(1)}(),
)

const ${d.slice}Slice = createSlice({
  name: '${d.slice}',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetch${d.slice.charAt(0).toUpperCase() + d.slice.slice(1)}List.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetch${d.slice.charAt(0).toUpperCase() + d.slice.slice(1)}List.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const normalized = normalizeEntities(action.payload)
        state.ids = normalized.ids
        state.entities = normalized.entities as Record<string, ${TypeName}>
      })
      .addCase(fetch${d.slice.charAt(0).toUpperCase() + d.slice.slice(1)}List.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to load'
      })
  },
})

export const ${d.slice}Reducer = ${d.slice}Slice.reducer
export const select${d.slice}State = (state: RootState): ${d.slice.charAt(0).toUpperCase() + d.slice.slice(1)}State => state.${d.slice}
`,
  )
  write(
    `slices/${d.slice}Selectors.ts`,
    `import { createSelector } from '@reduxjs/toolkit'
import { select${d.slice}State } from './${d.slice}Slice'
import type { ${TypeName} } from '@/modules/${d.name}/types'

export const select${d.slice}List = createSelector([select${d.slice}State], (state): ${TypeName}[] =>
  state.ids.map((id) => state.entities[id]).filter((e): e is ${TypeName} => Boolean(e)),
)

export const select${d.slice}Status = createSelector([select${d.slice}State], (s) => s.status)
`,
  )
}

console.log('Scaffolded', domains.length, 'domains')
