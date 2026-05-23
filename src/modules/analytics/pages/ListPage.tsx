import { PageHeader } from '@/components/PageHeader'
import { PageLoader } from '@/components/PageLoader'
import { useAnalyticsDashboard } from '../hooks'

export function AnalyticsListPage(): React.JSX.Element {
  const { dashboard, status } = useAnalyticsDashboard()

  if (status === 'loading') return <PageLoader />

  return (
    <div>
      <PageHeader title="Analytics" description="Analytics and insights" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboard?.metrics.map((m) => (
          <div key={m.label} className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">{m.label}</p>
            <p className="mt-1 text-2xl font-bold">{m.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
