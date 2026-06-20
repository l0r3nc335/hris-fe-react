import type { ComponentType } from 'react'

export type FeaturePageKind = 'crud' | 'readonly' | 'dashboard'

export interface FeaturePageDefinition {
  slug: string
  path: string
  title: string
  kind: FeaturePageKind
  load: () => Promise<{ default: ComponentType }>
}

export const FEATURE_PAGES: FeaturePageDefinition[] = [
  {
    slug: 'dashboard',
    path: '/dashboard',
    title: 'Dashboard',
    kind: 'dashboard',
    load: () => import('@/modules/dashboard/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
  },
  {
    slug: 'users',
    path: '/users',
    title: 'Users',
    kind: 'crud',
    load: () => import('@/modules/users/pages/ListPage').then((m) => ({ default: m.UsersListPage })),
  },
  {
    slug: 'employees',
    path: '/employees',
    title: 'Employees',
    kind: 'crud',
    load: () => import('@/modules/employees/pages/ListPage').then((m) => ({ default: m.EmployeesListPage })),
  },
  {
    slug: 'employee-departments',
    path: '/employee-departments',
    title: 'Employee Department',
    kind: 'crud',
    load: () =>
      import('@/modules/employeeDepartments/pages/ListPage').then((m) => ({
        default: m.EmployeeDepartmentsListPage,
      })),
  },
  {
    slug: 'departments',
    path: '/departments',
    title: 'Departments',
    kind: 'crud',
    load: () => import('@/modules/departments/pages/ListPage').then((m) => ({ default: m.DepartmentsListPage })),
  },
  {
    slug: 'positions',
    path: '/positions',
    title: 'Positions',
    kind: 'crud',
    load: () => import('@/modules/positions/pages/ListPage').then((m) => ({ default: m.PositionsListPage })),
  },
  {
    slug: 'attendance',
    path: '/attendance',
    title: 'Attendance',
    kind: 'crud',
    load: () => import('@/modules/attendance/pages/ListPage').then((m) => ({ default: m.AttendanceListPage })),
  },
  {
    slug: 'leave',
    path: '/leave',
    title: 'Leave',
    kind: 'crud',
    load: () => import('@/modules/leave/pages/ListPage').then((m) => ({ default: m.LeaveListPage })),
  },
  {
    slug: 'payroll',
    path: '/payroll',
    title: 'Payroll',
    kind: 'crud',
    load: () => import('@/modules/payroll/pages/ListPage').then((m) => ({ default: m.PayrollListPage })),
  },
  {
    slug: 'compensation',
    path: '/compensation',
    title: 'Compensation',
    kind: 'crud',
    load: () => import('@/modules/compensation/pages/ListPage').then((m) => ({ default: m.CompensationListPage })),
  },
  {
    slug: 'time-tracking',
    path: '/time-tracking',
    title: 'Time Tracking',
    kind: 'crud',
    load: () => import('@/modules/timeTracking/pages/ListPage').then((m) => ({ default: m.TimeTrackingListPage })),
  },
  {
    slug: 'recruitment',
    path: '/recruitment',
    title: 'Recruitment',
    kind: 'crud',
    load: () => import('@/modules/recruitment/pages/ListPage').then((m) => ({ default: m.RecruitmentListPage })),
  },
  {
    slug: 'interviews',
    path: '/interviews',
    title: 'Interviews',
    kind: 'crud',
    load: () => import('@/modules/interviews/pages/ListPage').then((m) => ({ default: m.InterviewsListPage })),
  },
  {
    slug: 'performance',
    path: '/performance',
    title: 'Performance',
    kind: 'crud',
    load: () => import('@/modules/performance/pages/ListPage').then((m) => ({ default: m.PerformanceListPage })),
  },
  {
    slug: 'org-chart',
    path: '/org-chart',
    title: 'Organization',
    kind: 'readonly',
    load: () => import('@/modules/organization/pages/ListPage').then((m) => ({ default: m.OrganizationListPage })),
  },
  {
    slug: 'documents',
    path: '/documents',
    title: 'Documents',
    kind: 'crud',
    load: () => import('@/modules/documents/pages/ListPage').then((m) => ({ default: m.DocumentsListPage })),
  },
  {
    slug: 'notifications',
    path: '/notifications',
    title: 'Notifications',
    kind: 'crud',
    load: () => import('@/modules/notifications/pages/ListPage').then((m) => ({ default: m.NotificationsListPage })),
  },
  {
    slug: 'roles',
    path: '/roles',
    title: 'Roles',
    kind: 'crud',
    load: () => import('@/modules/roles/pages/ListPage').then((m) => ({ default: m.RolesListPage })),
  },
  {
    slug: 'permissions',
    path: '/permissions',
    title: 'Permissions',
    kind: 'readonly',
    load: () => import('@/modules/permissions/pages/ListPage').then((m) => ({ default: m.PermissionsListPage })),
  },
  {
    slug: 'onboarding',
    path: '/onboarding',
    title: 'Onboarding',
    kind: 'crud',
    load: () => import('@/modules/onboarding/pages/ListPage').then((m) => ({ default: m.OnboardingListPage })),
  },
  {
    slug: 'benefits',
    path: '/benefits',
    title: 'Benefits',
    kind: 'crud',
    load: () => import('@/modules/benefits/pages/ListPage').then((m) => ({ default: m.BenefitsListPage })),
  },
  {
    slug: 'training',
    path: '/training',
    title: 'Training',
    kind: 'crud',
    load: () => import('@/modules/training/pages/ListPage').then((m) => ({ default: m.TrainingListPage })),
  },
  {
    slug: 'audit-logs',
    path: '/audit-logs',
    title: 'Audit Logs',
    kind: 'readonly',
    load: () => import('@/modules/audit/pages/ListPage').then((m) => ({ default: m.AuditListPage })),
  },
  {
    slug: 'reports',
    path: '/reports',
    title: 'Reports',
    kind: 'readonly',
    load: () => import('@/modules/reports/pages/ListPage').then((m) => ({ default: m.ReportsListPage })),
  },
  {
    slug: 'analytics',
    path: '/analytics',
    title: 'Analytics',
    kind: 'dashboard',
    load: () => import('@/modules/analytics/pages/ListPage').then((m) => ({ default: m.AnalyticsListPage })),
  },
  {
    slug: 'settings',
    path: '/settings',
    title: 'Settings',
    kind: 'crud',
    load: () => import('@/modules/settings/pages/ListPage').then((m) => ({ default: m.SettingsListPage })),
  },
  {
    slug: 'tenants',
    path: '/tenants',
    title: 'Tenants',
    kind: 'crud',
    load: () => import('@/modules/tenants/pages/ListPage').then((m) => ({ default: m.TenantsListPage })),
  },
  {
    slug: 'billing',
    path: '/billing',
    title: 'Billing',
    kind: 'crud',
    load: () => import('@/modules/billing/pages/ListPage').then((m) => ({ default: m.BillingListPage })),
  },
  {
    slug: 'system',
    path: '/admin/health',
    title: 'System',
    kind: 'readonly',
    load: () => import('@/modules/system/pages/ListPage').then((m) => ({ default: m.SystemListPage })),
  },
]
