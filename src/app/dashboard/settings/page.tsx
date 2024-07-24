'use client'

import { getAllMerchantParameters } from '@/services/merchant-parameters'
import { useQuery } from '@tanstack/react-query'
import { DisplayParameter } from './components/parameter'

export default function Setting() {
  const parameterQuery = useQuery({
    queryKey: ['merchantParameters'],
    queryFn: getAllMerchantParameters,
    refetchOnMount: false,
  })

  return (
    <div>
      <div className="space-y-4">
        {parameterQuery?.data &&
          parameterQuery.data.map((parameter) => (
            <DisplayParameter key={parameter.id} parameter={parameter} />
          ))}
      </div>
    </div>
  )
}
