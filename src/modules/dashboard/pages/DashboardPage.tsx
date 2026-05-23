import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { PageHeader } from '@/components/PageHeader'
import { PageLoader } from '@/components/PageLoader'
import { fetchAnalyticsDashboard } from '@/slices/analyticsSlice'
import { selectAnalyticsDashboard, selectAnalyticsStatus } from '@/slices/analyticsSelectors'

export function DashboardPage(): React.JSX.Element {
  const dispatch = useAppDispatch()
  const dashboard = useAppSelector(selectAnalyticsDashboard)
  const status = useAppSelector(selectAnalyticsStatus)

  useEffect(() => {
    if (status === 'idle') void dispatch(fetchAnalyticsDashboard())
  }, [dispatch, status])

  if (status === 'loading') return <PageLoader />

  return (
    <div>
      <PageHeader title="Dashboard" description="HRIS analytics overview" />
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
