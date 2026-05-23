import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchAnalyticsDashboard } from '@/slices/analyticsSlice'
import { selectAnalyticsDashboard, selectAnalyticsStatus } from '@/slices/analyticsSelectors'
import type { DashboardData } from '@/services/api/analyticsApi'

export function useAnalyticsDashboard(): {
  dashboard: DashboardData | null
  status: ReturnType<typeof selectAnalyticsStatus>
} {
  const dispatch = useAppDispatch()
  const dashboard = useAppSelector(selectAnalyticsDashboard)
  const status = useAppSelector(selectAnalyticsStatus)

  useEffect(() => {
    if (status === 'idle') void dispatch(fetchAnalyticsDashboard())
  }, [dispatch, status])

  return { dashboard, status }
}
