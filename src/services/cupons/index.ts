import { QueryFunctionContext } from '@tanstack/react-query'
import { Cupom } from './types'
import { formSchemaCupom } from '@/app/dashboard/cupons/components/create-cupom'
import { api } from '../api'

export async function CreateCupom(data: formSchemaCupom) {
  const res = await api.post<{ cupom: Cupom }>('/cupons', {
    ...data,
  })

  return res.data.cupom
}

export async function GetAllCupons(ctx: QueryFunctionContext) {
  const [, page] = ctx.queryKey

  const { data } = await api.get<{ cupons: Cupom[] }>('/cupons?page=' + page)

  return data.cupons
}
