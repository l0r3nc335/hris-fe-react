import { lazy } from 'react'

export const LandingPage = lazy(() =>
  import('@/modules/public/pages/LandingPage').then((m) => ({ default: m.LandingPage })),
)
export const AboutPage = lazy(() =>
  import('@/modules/public/pages/AboutPage').then((m) => ({ default: m.AboutPage })),
)
export const PricingPage = lazy(() =>
  import('@/modules/public/pages/PricingPage').then((m) => ({ default: m.PricingPage })),
)
export const ContactPage = lazy(() =>
  import('@/modules/public/pages/ContactPage').then((m) => ({ default: m.ContactPage })),
)
export const DashboardPage = lazy(() =>
  import('@/modules/dashboard/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
)
export const LoginPage = lazy(() =>
  import('@/modules/auth/pages/LoginPage').then((m) => ({ default: m.LoginPage })),
)
export const RegisterPage = lazy(() =>
  import('@/modules/auth/pages/RegisterPage').then((m) => ({ default: m.RegisterPage })),
)
export const ForgotPasswordPage = lazy(() =>
  import('@/modules/auth/pages/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage })),
)
export const ResetPasswordPage = lazy(() =>
  import('@/modules/auth/pages/ResetPasswordPage').then((m) => ({ default: m.ResetPasswordPage })),
)
export const UsersListPage = lazy(() =>
  import('@/modules/users/pages/ListPage').then((m) => ({ default: m.UsersListPage })),
)
export const EmployeesListPage = lazy(() =>
  import('@/modules/employees/pages/ListPage').then((m) => ({ default: m.EmployeesListPage })),
)
export const DepartmentsListPage = lazy(() =>
  import('@/modules/departments/pages/ListPage').then((m) => ({ default: m.DepartmentsListPage })),
)
export const PositionsListPage = lazy(() =>
  import('@/modules/positions/pages/ListPage').then((m) => ({ default: m.PositionsListPage })),
)
export const AttendanceListPage = lazy(() =>
  import('@/modules/attendance/pages/ListPage').then((m) => ({ default: m.AttendanceListPage })),
)
export const LeaveListPage = lazy(() =>
  import('@/modules/leave/pages/ListPage').then((m) => ({ default: m.LeaveListPage })),
)
export const PayrollListPage = lazy(() =>
  import('@/modules/payroll/pages/ListPage').then((m) => ({ default: m.PayrollListPage })),
)
export const CompensationListPage = lazy(() =>
  import('@/modules/compensation/pages/ListPage').then((m) => ({ default: m.CompensationListPage })),
)
export const TimeTrackingListPage = lazy(() =>
  import('@/modules/timeTracking/pages/ListPage').then((m) => ({ default: m.TimeTrackingListPage })),
)
export const RecruitmentListPage = lazy(() =>
  import('@/modules/recruitment/pages/ListPage').then((m) => ({ default: m.RecruitmentListPage })),
)
export const InterviewsListPage = lazy(() =>
  import('@/modules/interviews/pages/ListPage').then((m) => ({ default: m.InterviewsListPage })),
)
export const PerformanceListPage = lazy(() =>
  import('@/modules/performance/pages/ListPage').then((m) => ({ default: m.PerformanceListPage })),
)
export const OrganizationListPage = lazy(() =>
  import('@/modules/organization/pages/ListPage').then((m) => ({ default: m.OrganizationListPage })),
)
export const DocumentsListPage = lazy(() =>
  import('@/modules/documents/pages/ListPage').then((m) => ({ default: m.DocumentsListPage })),
)
export const NotificationsListPage = lazy(() =>
  import('@/modules/notifications/pages/ListPage').then((m) => ({ default: m.NotificationsListPage })),
)
export const RolesListPage = lazy(() =>
  import('@/modules/roles/pages/ListPage').then((m) => ({ default: m.RolesListPage })),
)
export const AuditListPage = lazy(() =>
  import('@/modules/audit/pages/ListPage').then((m) => ({ default: m.AuditListPage })),
)
export const ReportsListPage = lazy(() =>
  import('@/modules/reports/pages/ListPage').then((m) => ({ default: m.ReportsListPage })),
)
export const AnalyticsListPage = lazy(() =>
  import('@/modules/analytics/pages/ListPage').then((m) => ({ default: m.AnalyticsListPage })),
)
export const SettingsListPage = lazy(() =>
  import('@/modules/settings/pages/ListPage').then((m) => ({ default: m.SettingsListPage })),
)
export const TenantsListPage = lazy(() =>
  import('@/modules/tenants/pages/ListPage').then((m) => ({ default: m.TenantsListPage })),
)
export const BillingListPage = lazy(() =>
  import('@/modules/billing/pages/ListPage').then((m) => ({ default: m.BillingListPage })),
)
export const SystemListPage = lazy(() =>
  import('@/modules/system/pages/ListPage').then((m) => ({ default: m.SystemListPage })),
)
export const PermissionsListPage = lazy(() =>
  import('@/modules/permissions/pages/ListPage').then((m) => ({ default: m.PermissionsListPage })),
)
export const OnboardingListPage = lazy(() =>
  import('@/modules/onboarding/pages/ListPage').then((m) => ({ default: m.OnboardingListPage })),
)
export const BenefitsListPage = lazy(() =>
  import('@/modules/benefits/pages/ListPage').then((m) => ({ default: m.BenefitsListPage })),
)
export const TrainingListPage = lazy(() =>
  import('@/modules/training/pages/ListPage').then((m) => ({ default: m.TrainingListPage })),
)
