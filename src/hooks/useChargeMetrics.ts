import { useQuery } from '@tanstack/react-query'
import { ChargeMetrics } from '@/services/graphs'

export const useChargeMetrics = () => {
  return useQuery({
    queryKey: ['charge-metrics'],
    queryFn: ChargeMetrics,
    refetchOnMount: false,
  })
}
