export interface SubscriptionPlan {
  id: string
  slug: string
  label: string
  description?: string
  price?: string
  currency?: string
  billingInterval?: string
  trialDays?: number
  isActive?: boolean
  deletedAt?: string
  createdAt?: string
  updatedAt?: string
  defaultUserCount?: number
  priceAdditionalUsers?: string
}
