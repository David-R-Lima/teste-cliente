import { useQuery } from '@tanstack/react-query'
import { CustomerMetrics } from '@/services/graphs'

export const useCustomerMetrics = () => {
  return useQuery({
    queryKey: ['customer-metrics'],
    queryFn: CustomerMetrics,
    refetchOnMount: false,
  })
}
