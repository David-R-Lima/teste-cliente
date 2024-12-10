'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  getMerchantPameters,
  MerchantParameterProps,
} from '@/services/reports/pagbttis/get-merchant-parameters'

import {
  ImerchantParameters,
  setMerchantSettings,
} from '@/services/reports/pagbttis/set-merchant-parameters'
import { useEffect, useState } from 'react'

export default function MerchantParameters() {
  const [dataParameters, setDataParameters] = useState<
    MerchantParameterProps[]
  >([])

  const [reload, setReload] = useState(false)

  const formSubmit = async ({
    name,
    description,
    group,
    type,
  }: ImerchantParameters) => {
    const res = await setMerchantSettings({ name, description, group, type })

    console.log('resultado form submit ---', res)

    if (!res) {
      alert('Erro ao salvar parametro')
    } else {
      alert('Parametro salvo')
    }
    setReload(!reload)
  }

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
  }, [reload])

  return (
    <div>
      <span className="text-lg"> Parâmetros dos vendedores</span>
      <div className="flex flex-rol gap-8 mb-10 justify-between   flex-wrap border-2 p-6">
        <div className="mb-4">
          <Button> Novo</Button>
          <form>
            <Label> Nome</Label>
            <Input defaultValue={''} />

            <Label> Descrição</Label>
            <Input defaultValue={''} />

            <Label> Grupo</Label>
            <Input defaultValue={''} />

            <Label> Tipo</Label>
            <Input defaultValue={''} />
            <Button className="mt-4"> Salvar</Button>
          </form>
        </div>

        {dataParameters && (
          <ul className="flex flex-col gap-4">
            {dataParameters?.map((item, index) => (
              <li key={index} className="border-t-2 border-b-slate-500">
                {' '}
                Nome parâmetro: {item.name} - Descrição: {item.description} -
                Tipo: {item.type} - Grupo: {item.group}{' '}
                <Button
                  className="bg-green-300 p-1 hover:bg-green-500"
                  size={'sm'}
                  onClick={() => {}}
                >
                  {' '}
                  Salvar
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
