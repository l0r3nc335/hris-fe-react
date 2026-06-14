import { PageHeader } from '@/components/PageHeader'
import { PageLoader } from '@/components/PageLoader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { DashboardMetric } from '@/services/api/analyticsApi'

export interface MetricsDashboardProps {
  title: string
  description: string
  metrics: DashboardMetric[] | undefined
  isLoading: boolean
}

export function MetricsDashboard({
  title,
  description,
  metrics,
  isLoading,
}: MetricsDashboardProps): React.JSX.Element {
  if (isLoading) return <PageLoader />

  return (
    <div>
      <PageHeader title={title} description={description} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics?.map((m) => (
          <Card key={m.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-normal text-muted-foreground">
                {m.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{m.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
