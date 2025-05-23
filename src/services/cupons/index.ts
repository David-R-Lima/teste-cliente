import { QueryFunctionContext } from '@tanstack/react-query'
import { Cupom, validateCupomFormSchema } from './types'
import { formSchemaCupom } from '@/app/dashboard/cupons/components/create-cupom'
import { api } from '../api'

export async function CreateCupom(data: formSchemaCupom) {
  const res = await api.post<{ cupom: Cupom }>('/cupons', {
    ...data,
  })

  return res.data.cupom
}

export async function GetAllCupons(ctx: QueryFunctionContext) {
  const [, page, filter] = ctx.queryKey

  const { data } = await api.get<{ cupons: Cupom[] }>('/cupons', {
    params: {
      page,
      filter,
    },
  })

  return data.cupons
}

export async function ValidateCupom(data: validateCupomFormSchema) {
  const res = await api.post<{
    valid: boolean
    message: string | null
  }>('/cupons/validate', {
    ...data,
  })

  return res.data
}
