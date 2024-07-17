'use client'

import { GetAllCupons } from '@/services/cupons'
import { useQuery } from '@tanstack/react-query'

export default function Cupons() {
  const cupons = useQuery({
    queryKey: ['cupons', 1],
    queryFn: GetAllCupons,
  })

  console.log(cupons)
  return <div></div>
}
