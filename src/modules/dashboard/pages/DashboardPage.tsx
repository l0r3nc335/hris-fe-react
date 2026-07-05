import { MetricsDashboard } from '@/components/MetricsDashboard'
import { PageShell } from '@/components/layout/PageShell'
import { useAppSelector } from '@/hooks'
import { usePermission } from '@/hooks/usePermission'
import { useAnalyticsDashboard } from '@/modules/analytics/hooks'
import { PERMISSIONS } from '@/constants/permissions'
import { selectUser } from '@/slices/authSlice'

function DashboardAnalytics(): React.JSX.Element {
  const { data: dashboard, isLoading } = useAnalyticsDashboard()

  return (
    <MetricsDashboard
      title="Dashboard"
      description="HRIS analytics overview"
      metrics={dashboard?.metrics}
      isLoading={isLoading}
    />
  )
}

export function DashboardPage(): React.JSX.Element {
  const user = useAppSelector(selectUser)
  const { can } = usePermission()
  const showAnalytics = can(PERMISSIONS.reportsRead)

  if (!showAnalytics) {
    const planLabel = user?.userSubscription?.plan?.label
    return (
      <PageShell
        title="Dashboard"
        description={planLabel ? `Welcome — ${planLabel} plan` : 'Welcome to your account'}
      >
        <p className="text-sm text-muted-foreground">
          Use the Overview menu to manage your subscription and billing.
        </p>
      </PageShell>
    )
  }

  return <DashboardAnalytics />
}
