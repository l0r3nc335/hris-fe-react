import { ROUTES } from '@/constants/routes'
import type { User } from '@/types'

export function isSubscriberOnboarding(user: User | null | undefined): boolean {
  return user?.role === 'subscriber' && !user.userSubscription
}

export function isSubscriberOnboardingPath(pathname: string): boolean {
  if (pathname === ROUTES.mySubscription) return true
  return pathname.startsWith(`${ROUTES.mySubscription}/payment/`)
}

export function mySubscriptionPaymentPath(subscriptionId: string): string {
  return `${ROUTES.mySubscription}/payment/${subscriptionId}`
}

const ONBOARDING_NAV_PATHS = [ROUTES.mySubscription] as const

/** During onboarding, only subscription funnel nav items stay clickable. */
export function isNavItemLockedDuringOnboarding(
  itemPath: string,
  onboardingLocked: boolean,
  pathname?: string,
): boolean {
  if (!onboardingLocked) return false
  if (ONBOARDING_NAV_PATHS.includes(itemPath as typeof ONBOARDING_NAV_PATHS[number])) {
    return false
  }
  if (pathname && isSubscriberOnboardingPath(pathname) && itemPath === ROUTES.mySubscription) {
    return false
  }
  return true
}
