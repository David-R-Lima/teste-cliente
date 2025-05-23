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
      <div>
        <h1 className=" font-bold text-secondary text-2xl">
          Configurações {'>'} Parâmetros
        </h1>
      </div>
      <div className="space-y-4 mt-6 ">
        {parameterQuery?.data &&
          parameterQuery.data.map((parameter) => {
            if (parameter.name === 'CD_REC_TRA_TIP_PDR') return null
            if (parameter.name === 'TX_URL_NOT_VND') return null
            return <DisplayParameter key={parameter.id} parameter={parameter} />
          })}
      </div>
    </div>
  )
}
