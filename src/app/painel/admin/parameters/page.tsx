'use client'

import {
  getMerchantPameters,
  MerchantParameterProps,
} from '@/services/reports/pagbttis/get-merchant-parameters'

import { useEffect, useState } from 'react'

export default function MerchantParameters() {
  const [dataParameters, setDataParameters] = useState<
    MerchantParameterProps[]
  >([])

  useEffect(() => {
    const fetchParameters = async () => {
      try {
        const data = await getMerchantPameters()

        if (data) setDataParameters(data)
      } catch (error) {
        return null
      }
    }

    fetchParameters()
  }, [])

  return (
    <div>
      <span className="text-xl text-gray-500"> Parâmetros dos vendedores</span>
      <div className="flex flex-rol gap-8 mb-10 justify-between   flex-wrap border-2 p-6 text-sm">
        {dataParameters && (
          <ul className="flex flex-col gap-4">
            {dataParameters?.map((item) => (
              <li key={item.id} className="border-t-2 border-b-slate-500">
                <p>ID: {item.id}</p>
                <p>Nome parâmetro: {item.name}</p>
                <p> Descrição: {item.description}</p>
                <p> Tipo: {item.type}</p>
                <p>Grupo: {item.group}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
