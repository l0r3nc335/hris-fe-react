import { useQuery } from '@tanstack/react-query'
import { fetchSubscriptionPlans } from '@/services/api/mySubscriptionApi'

export function useSubscriptionPlans() {
  return useQuery({
    queryKey: ['billing', 'plans'],
    queryFn: fetchSubscriptionPlans,
  })
}
