import { Link } from 'react-router-dom'
import { PageLoader } from '@/components/PageLoader'
import { PageShell } from '@/components/layout/PageShell'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/ui'
import { ROUTES } from '@/constants/routes'
import type { DashboardMetric } from '@/services/api/analyticsApi'
import {
  Users,
  Calendar,
  FileBarChart,
  Settings,
  ArrowRight,
  Activity,
} from 'lucide-react'

export interface MetricsDashboardProps {
  title: string
  description: string
  metrics: DashboardMetric[] | undefined
  isLoading: boolean
  recentActivity?: { id: string; label: string; time: string }[]
}

const QUICK_LINKS = [
  { label: 'Employees', path: ROUTES.employees, icon: Users },
  { label: 'Leave', path: ROUTES.leave, icon: Calendar },
  { label: 'Reports', path: ROUTES.reports, icon: FileBarChart },
  { label: 'Settings', path: ROUTES.settings, icon: Settings },
]

export function MetricsDashboard({
  title,
  description,
  metrics,
  isLoading,
  recentActivity = [],
}: MetricsDashboardProps): React.JSX.Element {
  if (isLoading) return <PageLoader />

  const activity =
    recentActivity.length > 0
      ? recentActivity
      : [
          { id: '1', label: 'Payroll run completed', time: '2 hours ago' },
          { id: '2', label: '3 leave requests pending approval', time: '4 hours ago' },
          { id: '3', label: 'New employee onboarded', time: 'Yesterday' },
        ]

  return (
    <PageShell title={title} description={description}>
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

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 sm:grid-cols-2">
            {QUICK_LINKS.map((link) => (
              <Button key={link.path} variant="outline" className="justify-between" asChild>
                <Link to={link.path}>
                  <span className="flex items-center gap-2">
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="h-4 w-4" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {activity.map((item) => (
                <li key={item.id} className="flex items-start justify-between gap-2 text-sm">
                  <span>{item.label}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">{item.time}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
