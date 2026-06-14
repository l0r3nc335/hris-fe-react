import { MetricsDashboard } from '@/components/MetricsDashboard'
import { useAnalyticsDashboard } from '../hooks'

export function AnalyticsListPage(): React.JSX.Element {
  const { data: dashboard, isLoading } = useAnalyticsDashboard()

  return (
    <MetricsDashboard
      title="Analytics"
      description="Analytics and insights"
      metrics={dashboard?.metrics}
      isLoading={isLoading}
    />
  )
}
