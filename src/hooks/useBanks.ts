import { useQuery } from '@tanstack/react-query'
import { getAllBanks } from '@/services/banks'

export const useBanks = () => {
  return useQuery({
    queryKey: ['banks'],
    queryFn: getAllBanks,
    refetchOnMount: false,
  })
}
