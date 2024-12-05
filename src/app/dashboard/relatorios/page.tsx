'use client'
import { Input } from '@/components/ui/input'
import { CardsRelatorio } from './components/card-relatorio'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { setHeaderReportPameters } from '@/services/reports/merchant/set-header-reports-parameters'
import { getHeaderReportPameters } from '@/services/reports/merchant/get-header-reports-parameters'

type FormValues = {
  logo: string
  site: string
  phone: string
  addres: string
  city: string
}
export default function Relatorios() {
  const [formHeader, setFormHeader] = useState(false)

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormValues>()

  const formSubmit = async () => {
    const { addres, city, logo, phone, site } = getValues()

    const res = await setHeaderReportPameters({
      addres,
      city,
      logo,
      phone,
      site,
    })
    if (!res) {
      alert('Erro ao salvar parametros')
    } else {
      alert('Parametros salvos')
    }
  }

  useEffect(() => {
    const res = async () => {
      const data = await getHeaderReportPameters()

      if (data) {
        setValue('addres', data?.addres)
        setValue('city', data?.city)
        setValue('logo', data?.logo)
        setValue('site', data?.site)
        setValue('phone', data?.phone)
      }
    }
  }, [])

  return (
    <div>
      <Button
        onClick={() => setFormHeader(!formHeader)}
        className="my-10 bg-stone-300 hover:bg-slate-400"
      >
        {' '}
        {formHeader ? 'Fechar' : 'Editar cabeçalho dos relatórios'}{' '}
      </Button>

      {formHeader && (
        <div className="mb-10 max-w-72 border-2 p-6">
          <form onSubmit={handleSubmit(formSubmit)}>
            <Label> Url da logo</Label>
            <Input {...register('logo', { required: true, minLength: 10 })} />
            {errors.logo && <p> {errors.logo.message} ai</p>}
            <Label> Url do site</Label>
            <Input {...register('site', { required: true })} />
            {errors.site && <p role="alert">{errors.site.message}</p>}

            <Label> Telefone</Label>
            <Input {...register('phone', { required: true })} />
            {errors.phone && <p role="alert">{errors.phone.message}</p>}

            <Label> Endereço</Label>
            <Input
              placeholder="Rua h, 46"
              {...register('addres', { required: true })}
            />
            {errors.addres && <p role="alert">{errors.addres.message}</p>}

            <Label> Cidade</Label>
            <Input
              placeholder="Cidade, MG"
              {...register('city', { required: true })}
            />
            {errors.city && <p role="alert">{errors.city.message}</p>}

            <Button className="mt-4 "> Salvar</Button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        <CardsRelatorio></CardsRelatorio>
      </div>
    </div>
  )
}
