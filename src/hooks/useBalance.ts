import { useQuery } from '@tanstack/react-query'
import { getMerchantBalanceReport } from '@/services/reports/merchant/get-balance-report'

export const useBalance = () => {
  return useQuery({
    queryKey: ['balance'],
    queryFn: getMerchantBalanceReport,
    refetchOnMount: false,
  })
}
