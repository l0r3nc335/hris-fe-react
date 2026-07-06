import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '@/hooks'
import { selectUser } from '@/slices/authSlice'
import { ROUTES } from '@/constants/routes'
import { isSubscriberOnboarding, isSubscriberOnboardingPath } from '@/utils/subscriberOnboarding'

export function SubscriberOnboardingGuard({ children }: { children: ReactNode }): React.JSX.Element {
  const user = useAppSelector(selectUser)
  const { pathname } = useLocation()

  if (
    isSubscriberOnboarding(user)
    && !isSubscriberOnboardingPath(pathname)
  ) {
    return <Navigate to={ROUTES.mySubscription} replace />
  }

  return <>{children}</>
}
