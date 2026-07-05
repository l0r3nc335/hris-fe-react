import { Suspense, type ReactNode } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AuthLayout } from '@/layouts/AuthLayout'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { PublicLayout } from '@/layouts/PublicLayout'
import { RootLayout } from '@/layouts/RootLayout'
import { ProtectedRoute } from '@/routes/protectedRoute'
import { PageLoader } from '@/components/PageLoader'
import { lazyRouteElement } from '@/routes/lazyRouteElement'
import { ROUTE_SEGMENT_PERMISSIONS } from '@/constants/routePermissions'
import { ROUTES } from '@/constants/routes'
import * as Lazy from './lazyRoutes'

interface SuspenseWrapProps {
  children: ReactNode
}

function SuspenseWrap({ children }: SuspenseWrapProps): React.JSX.Element {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>
}

function dashboardRoute(
  path: string,
  page: Parameters<typeof lazyRouteElement>[0],
): { path: string; element: ReactNode } {
  return {
    path,
    element: lazyRouteElement(page, ROUTE_SEGMENT_PERMISSIONS[path]),
  }
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
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
          { path: 'verify-email', element: <SuspenseWrap><Lazy.VerifyEmailPage /></SuspenseWrap> },
          { path: '*', element: <SuspenseWrap><Lazy.NotFoundPage /></SuspenseWrap> },
        ],
      },
      {
        path: '/verify',
        element: <AuthLayout />,
        children: [
          { index: true, element: <SuspenseWrap><Lazy.VerifyEmailPage /></SuspenseWrap> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { path: 'dashboard', element: lazyRouteElement(Lazy.DashboardPage) },
              dashboardRoute('users', Lazy.UsersListPage),
              dashboardRoute('subscriptions', Lazy.SubscriptionsListPage),
              dashboardRoute('employees', Lazy.EmployeesListPage),
              dashboardRoute('employee-departments', Lazy.EmployeeDepartmentsListPage),
              dashboardRoute('departments', Lazy.DepartmentsListPage),
              { path: 'positions', element: lazyRouteElement(Lazy.PositionsListPage) },
              { path: 'attendance', element: lazyRouteElement(Lazy.AttendanceListPage) },
              { path: 'leave', element: lazyRouteElement(Lazy.LeaveListPage) },
              dashboardRoute('payroll', Lazy.PayrollListPage),
              { path: 'compensation', element: lazyRouteElement(Lazy.CompensationListPage) },
              { path: 'time-tracking', element: lazyRouteElement(Lazy.TimeTrackingListPage) },
              { path: 'recruitment', element: lazyRouteElement(Lazy.RecruitmentListPage) },
              { path: 'interviews', element: lazyRouteElement(Lazy.InterviewsListPage) },
              { path: 'performance', element: lazyRouteElement(Lazy.PerformanceListPage) },
              { path: 'org-chart', element: lazyRouteElement(Lazy.OrganizationListPage) },
              { path: 'documents', element: lazyRouteElement(Lazy.DocumentsListPage) },
              { path: 'notifications', element: lazyRouteElement(Lazy.NotificationsListPage) },
              dashboardRoute('roles', Lazy.RolesListPage),
              dashboardRoute('permissions', Lazy.PermissionsListPage),
              dashboardRoute('audit-logs', Lazy.AuditListPage),
              dashboardRoute('reports', Lazy.ReportsListPage),
              { path: 'analytics', element: lazyRouteElement(Lazy.AnalyticsListPage) },
              dashboardRoute('settings', Lazy.SettingsListPage),
              dashboardRoute('tenants', Lazy.TenantsListPage),
              dashboardRoute('billing', Lazy.BillingListPage),
              dashboardRoute('admin/health', Lazy.SystemListPage),
              { path: 'onboarding', element: lazyRouteElement(Lazy.OnboardingListPage) },
              { path: 'benefits', element: lazyRouteElement(Lazy.BenefitsListPage) },
              { path: 'training', element: lazyRouteElement(Lazy.TrainingListPage) },
              { path: '*', element: lazyRouteElement(Lazy.NotFoundPage) },
            ],
          },
        ],
      },
      { path: '/login', element: <Navigate to={ROUTES.login} replace /> },
    ],
  },
])
