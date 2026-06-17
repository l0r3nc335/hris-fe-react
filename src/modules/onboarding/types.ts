import type { BaseEntity } from '@/types'

export interface OnboardingEntity extends BaseEntity {
  name: string
  status: string
}
