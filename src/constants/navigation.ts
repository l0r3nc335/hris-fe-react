import { ROUTES } from './routes'
import { PERMISSIONS, type Permission } from './permissions'

export interface NavItem {
  label: string
  path: string
  permission?: Permission
}

export const MAIN_NAV: NavItem[] = [
  { label: 'Dashboard', path: ROUTES.home },
  { label: 'Users', path: ROUTES.users, permission: PERMISSIONS.usersRead },
  { label: 'Employees', path: ROUTES.employees, permission: PERMISSIONS.employeesRead },
  { label: 'Departments', path: ROUTES.departments, permission: PERMISSIONS.departmentsRead },
  { label: 'Positions', path: ROUTES.positions },
  { label: 'Attendance', path: ROUTES.attendance },
  { label: 'Leave', path: ROUTES.leave },
  { label: 'Payroll', path: ROUTES.payroll, permission: PERMISSIONS.payrollRead },
  { label: 'Compensation', path: ROUTES.compensation },
  { label: 'Time Tracking', path: ROUTES.timeTracking },
  { label: 'Recruitment', path: ROUTES.recruitment },
  { label: 'Interviews', path: ROUTES.interviews },
  { label: 'Performance', path: ROUTES.performance },
  { label: 'Org Chart', path: ROUTES.orgChart },
  { label: 'Documents', path: ROUTES.documents },
  { label: 'Notifications', path: ROUTES.notifications },
  { label: 'Roles', path: ROUTES.roles, permission: PERMISSIONS.rolesManage },
  { label: 'Audit Logs', path: ROUTES.auditLogs, permission: PERMISSIONS.auditRead },
  { label: 'Reports', path: ROUTES.reports, permission: PERMISSIONS.reportsRead },
  { label: 'Analytics', path: ROUTES.analytics },
  { label: 'Settings', path: ROUTES.settings, permission: PERMISSIONS.settingsWrite },
  { label: 'Tenants', path: ROUTES.tenants, permission: PERMISSIONS.tenantsManage },
  { label: 'Billing', path: ROUTES.billing, permission: PERMISSIONS.billingRead },
  { label: 'System', path: ROUTES.systemHealth },
]
