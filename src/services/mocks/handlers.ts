import { http, HttpResponse } from 'msw'
import { createList, mockUser } from './seed'

const API = '*/api/v1'

function ok<T>(data: T) {
  return HttpResponse.json({ data })
}

const listPaths = [
  '/users',
  '/employees',
  '/departments',
  '/positions',
  '/attendance',
  '/leaves',
  '/payroll',
  '/time-logs',
  '/recruitment/jobs',
  '/recruitment/applicants',
  '/interviews',
  '/performance/reviews',
  '/documents',
  '/notifications',
  '/roles',
  '/audit-logs',
  '/tenants',
  '/billing/invoices',
]

export const handlers = [
  http.post(`${API}/auth/login`, () =>
    ok({
      user: mockUser,
      tokens: { accessToken: 'mock-access-token', refreshToken: 'mock-refresh-token' },
    }),
  ),
  http.post(`${API}/auth/logout`, () => ok(null)),
  http.post(`${API}/auth/refresh-token`, () =>
    ok({ accessToken: 'mock-access-token', refreshToken: 'mock-refresh-token' }),
  ),
  http.get(`${API}/auth/me`, () => ok(mockUser)),
  http.get(`${API}/analytics/dashboard`, () =>
    ok({
      metrics: [
        { label: 'Employees', value: 128 },
        { label: 'Departments', value: 12 },
        { label: 'Pending Leave', value: 7 },
        { label: 'Open Positions', value: 4 },
      ],
    }),
  ),
  http.get(`${API}/health`, () => ok({ status: 'ok' })),
  http.get(`${API}/compensation`, () => ok(createList('Compensation'))),
  http.get(`${API}/compensation/:employeeId`, ({ params }) =>
    ok({ employeeId: params.employeeId, baseSalary: 75000 }),
  ),
  http.get(`${API}/salary-structures`, () => ok(createList('Structure'))),
  ...listPaths.map((path) =>
    http.get(`${API}${path}`, () => {
      const name = path.split('/').filter(Boolean).pop() ?? 'Item'
      return ok(createList(name.charAt(0).toUpperCase() + name.slice(1)))
    }),
  ),
  http.get(`${API}/users/:id`, () => ok(mockUser)),
  http.get(`${API}/employees/:id`, () => ok(createList('Employee')[0])),
  http.get(`${API}/org/chart`, () => ok({ nodes: [], edges: [] })),
  http.get(`${API}/org/reporting-lines`, () => ok([])),
  http.get(`${API}/org/positions-tree`, () => ok([])),
  http.get(`${API}/settings`, () => ok({ companyName: 'Acme HRIS' })),
  http.get(`${API}/settings/company`, () => ok({ companyName: 'Acme HRIS' })),
  http.get(`${API}/settings/leave-types`, () => ok(createList('LeaveType'))),
  http.get(`${API}/billing/subscription`, () => ok({ plan: 'enterprise', status: 'active' })),
  http.get(`${API}/permissions`, () => ok([])),
  http.get(`${API}/reports/employees`, () => ok({ total: 128 })),
  http.get(`${API}/reports/attendance`, () => ok({ rate: 0.94 })),
  http.get(`${API}/reports/payroll`, () => ok({ total: 450000 })),
  http.get(`${API}/reports/leave-usage`, () => ok({ days: 320 })),
  http.get(`${API}/reports/turnover`, () => ok({ rate: 0.08 })),
]
