'use client'

import { VerifyHealth } from '@/services/health'
import { useQuery } from '@tanstack/react-query'

export default function Status() {
  const { data } = useQuery({
    queryFn: VerifyHealth,
    queryKey: ['health-check'],
  })

  console.log(data)
  return (
    <div className="flex items-center justify-center h-[80vh] w-[40vw] border border-red-200 m-auto mt-10 rounded-lg">
      {/* <div id="ms-pagamento">{data.data?.health['ms-pagamento'].status}</div> */}
    </div>
  )
}
