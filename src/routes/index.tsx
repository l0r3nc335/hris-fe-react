import { Suspense, type ReactNode } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AuthLayout } from '@/layouts/AuthLayout'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { PublicLayout } from '@/layouts/PublicLayout'
import { ProtectedRoute } from '@/routes/protectedRoute'
import { PageLoader } from '@/components/PageLoader'
import { ROUTES } from '@/constants/routes'
import { PERMISSIONS } from '@/constants/permissions'
import * as Lazy from './lazyRoutes'

interface SuspenseWrapProps {
  children: ReactNode
}

function SuspenseWrap({ children }: SuspenseWrapProps): React.JSX.Element {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>
}

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { index: true, element: <SuspenseWrap><Lazy.LandingPage /></SuspenseWrap> },
      { path: 'about', element: <SuspenseWrap><Lazy.AboutPage /></SuspenseWrap> },
      { path: 'pricing', element: <SuspenseWrap><Lazy.PricingPage /></SuspenseWrap> },
      { path: 'contact', element: <SuspenseWrap><Lazy.ContactPage /></SuspenseWrap> },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <SuspenseWrap><Lazy.LoginPage /></SuspenseWrap> },
      { path: 'register', element: <SuspenseWrap><Lazy.RegisterPage /></SuspenseWrap> },
      { path: 'forgot-password', element: <SuspenseWrap><Lazy.ForgotPasswordPage /></SuspenseWrap> },
      { path: 'reset-password', element: <SuspenseWrap><Lazy.ResetPasswordPage /></SuspenseWrap> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: 'dashboard', element: <SuspenseWrap><Lazy.DashboardPage /></SuspenseWrap> },
          { path: 'users', element: <SuspenseWrap><Lazy.UsersListPage /></SuspenseWrap> },
          { path: 'employees', element: <SuspenseWrap><Lazy.EmployeesListPage /></SuspenseWrap> },
          { path: 'departments', element: <SuspenseWrap><Lazy.DepartmentsListPage /></SuspenseWrap> },
          { path: 'positions', element: <SuspenseWrap><Lazy.PositionsListPage /></SuspenseWrap> },
          { path: 'attendance', element: <SuspenseWrap><Lazy.AttendanceListPage /></SuspenseWrap> },
          { path: 'leave', element: <SuspenseWrap><Lazy.LeaveListPage /></SuspenseWrap> },
          { path: 'payroll', element: <SuspenseWrap><Lazy.PayrollListPage /></SuspenseWrap> },
          { path: 'compensation', element: <SuspenseWrap><Lazy.CompensationListPage /></SuspenseWrap> },
          { path: 'time-tracking', element: <SuspenseWrap><Lazy.TimeTrackingListPage /></SuspenseWrap> },
          { path: 'recruitment', element: <SuspenseWrap><Lazy.RecruitmentListPage /></SuspenseWrap> },
          { path: 'interviews', element: <SuspenseWrap><Lazy.InterviewsListPage /></SuspenseWrap> },
          { path: 'performance', element: <SuspenseWrap><Lazy.PerformanceListPage /></SuspenseWrap> },
          { path: 'org-chart', element: <SuspenseWrap><Lazy.OrganizationListPage /></SuspenseWrap> },
          { path: 'documents', element: <SuspenseWrap><Lazy.DocumentsListPage /></SuspenseWrap> },
          { path: 'notifications', element: <SuspenseWrap><Lazy.NotificationsListPage /></SuspenseWrap> },
          { path: 'roles', element: <SuspenseWrap><Lazy.RolesListPage /></SuspenseWrap> },
          { path: 'permissions', element: <SuspenseWrap><Lazy.PermissionsListPage /></SuspenseWrap> },
          { path: 'audit-logs', element: <SuspenseWrap><Lazy.AuditListPage /></SuspenseWrap> },
          { path: 'reports', element: <SuspenseWrap><Lazy.ReportsListPage /></SuspenseWrap> },
          { path: 'analytics', element: <SuspenseWrap><Lazy.AnalyticsListPage /></SuspenseWrap> },
          { path: 'settings', element: <SuspenseWrap><Lazy.SettingsListPage /></SuspenseWrap> },
          { path: 'tenants', element: <ProtectedRoute permissions={[PERMISSIONS.tenantsManage]} />, children: [
            { index: true, element: <SuspenseWrap><Lazy.TenantsListPage /></SuspenseWrap> },
          ] },
          { path: 'billing', element: <ProtectedRoute permissions={[PERMISSIONS.billingRead]} />, children: [
            { index: true, element: <SuspenseWrap><Lazy.BillingListPage /></SuspenseWrap> },
          ] },
          { path: 'admin/health', element: <ProtectedRoute permissions={[PERMISSIONS.tenantsManage]} />, children: [
            { index: true, element: <SuspenseWrap><Lazy.SystemListPage /></SuspenseWrap> },
          ] },
          { path: 'onboarding', element: <SuspenseWrap><Lazy.OnboardingListPage /></SuspenseWrap> },
          { path: 'benefits', element: <SuspenseWrap><Lazy.BenefitsListPage /></SuspenseWrap> },
          { path: 'training', element: <SuspenseWrap><Lazy.TrainingListPage /></SuspenseWrap> },
        ],
      },
    ],
  },
  { path: '/login', element: <Navigate to={ROUTES.login} replace /> },
  { path: '*', element: <Navigate to={ROUTES.landing} replace /> },
])
