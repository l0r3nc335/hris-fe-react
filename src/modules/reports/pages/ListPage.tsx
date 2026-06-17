import { EntityListPage } from '@/components/EntityListPage'
import { PageShell } from '@/components/layout/PageShell'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/ui'
import { useReportsList } from '../hooks'
import { REPORT_TYPES, useReportGenerateMutation } from '@/queries/reports/queries'

export function ReportsListPage(): React.JSX.Element {
  const { data: items = [], isLoading } = useReportsList()
  const generateMutation = useReportGenerateMutation()

  return (
    <PageShell title="Reports" description="Generate and view HRIS reports">
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {REPORT_TYPES.map((report) => (
          <Card key={report.type}>
            <CardHeader>
              <CardTitle className="text-base">{report.label}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{report.description}</p>
              <Button
                size="sm"
                onClick={() => generateMutation.mutate(report.type)}
                disabled={generateMutation.isPending}
              >
                Generate
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <EntityListPage
        title="Generated Reports"
        description=""
        emptyTitle="No reports found"
        items={items}
        isLoading={isLoading}
        showActions={false}
        embedded
      />
    </PageShell>
  )
}
