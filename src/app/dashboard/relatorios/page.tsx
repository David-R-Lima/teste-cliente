'use client'
import { Input } from '@/components/ui/input'
import { CardsRelatorio } from './components/card-relatorio'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

import {
  headerReportParameters,
  setHeaderReportPameters,
} from '@/services/reports/merchant/set-header-reports-parameters'
import { getHeaderReportPameters } from '@/services/reports/merchant/get-header-reports-parameters'

export default function Relatorios() {
  const [showFormHeader, setFormHeader] = useState(false)
  const [addresValue, setAdressValue] = useState('')
  const [cityValue, setCityValue] = useState('')
  const [logoValue, setLogoValue] = useState('')
  const [siteValue, setSiteValue] = useState('')
  const [phoneValue, setPhoneValue] = useState('')

  const formSubmit = async ({
    parameterName,
    str,
    money,
    boolean,
    integer,
    date,
  }: headerReportParameters) => {
    const res = await setHeaderReportPameters({
      parameterName,
      str,
      money,
      boolean,
      integer,
      date,
    })
    console.log('resultado form submit ---', res)
    if (!res) {
      alert('Erro ao salvar parametro')
    } else {
      setAdressValue('')
      setCityValue('')
      setLogoValue('')
      setSiteValue('')
      setPhoneValue('')
      alert('Parametro salvo')
    }
  }

  useEffect(() => {
    const fetchParams = async () => {
      const data = await getHeaderReportPameters()

      if (data) {
        setAdressValue(data?.addres)
        setCityValue(data?.city)
        setLogoValue(data?.logo)
        setSiteValue(data?.site)
        setPhoneValue(data?.phone)
      }
    }

    fetchParams()
  }, [])

  return (
    <div>
      <Button
        onClick={() => setFormHeader(!showFormHeader)}
        className="my-10 bg-slate-300 hover:bg-slate-400"
      >
        {' '}
        {showFormHeader ? 'Fechar' : 'Editar cabeçalho dos relatórios'}{' '}
      </Button>

      {showFormHeader && (
        <div>
          <span className="text-lg"> Parâmetros do relatório</span>
          <div className="flex flex-rol gap-8 mb-10 max-w-xl justify-between   flex-wrap border-2 p-6">
            <div className="mb-4  w-full">
              <Label> Url da logo</Label>
              <Input
                className="flex max-w-xl"
                onChange={(e) => setLogoValue(e.target.value)}
                defaultValue={logoValue}
              />
              <Button
                className="mt-4 "
                onClick={() =>
                  formSubmit({
                    parameterName: 'TX_URL_IMG_LOG',
                    str: logoValue,
                  })
                }
              >
                {' '}
                Salvar
              </Button>
            </div>

            <div className="mb-4">
              <Label> Url do site </Label>
              <Input
                onChange={(e) => setSiteValue(e.target.value)}
                defaultValue={siteValue}
              />
              <Button
                className="mt-4"
                onClick={() =>
                  formSubmit({
                    parameterName: 'TX_URL_SIT_INT',
                    str: siteValue,
                  })
                }
              >
                {' '}
                Salvar
              </Button>
            </div>
            <div className="mb-4">
              <Label> Telefone</Label>
              <Input
                onChange={(e) => setPhoneValue(e.target.value)}
                defaultValue={phoneValue}
              />
              <Button
                className="mt-4 "
                onClick={() =>
                  formSubmit({ parameterName: 'TX_NR_TEL', str: phoneValue })
                }
              >
                {' '}
                Salvar
              </Button>
            </div>
            <div className="mb-8 flex flex-row gap-4 items-start">
              <div>
                <Label> Endereço</Label>
                <Input
                  placeholder="Rua h, 46"
                  onChange={(e) => setAdressValue(e.target.value)}
                  defaultValue={addresValue}
                />
                <Button
                  className="mt-4 "
                  onClick={() =>
                    formSubmit({
                      parameterName: 'TX_END_VND',
                      str: addresValue + ' / ' + cityValue,
                    })
                  }
                >
                  {' '}
                  Salvar
                </Button>
              </div>

              <div>
                <Label> Cidade</Label>
                <Input
                  placeholder="Cidade, MG"
                  onChange={(e) => setCityValue(e.target.value)}
                  defaultValue={cityValue}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <CardsRelatorio></CardsRelatorio>
      </div>
    </div>
  )
}
