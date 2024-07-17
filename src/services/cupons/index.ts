import { QueryFunctionContext } from '@tanstack/react-query'
import { apiGateway } from '../apiGateway'
import { Cupom } from './types'
import { formSchemaCupom } from '@/app/dashboard/cupons/components/create-cupom'

export async function CreateCupom(data: formSchemaCupom) {
  const res = await apiGateway.post<{ cupom: Cupom }>('/cupons', {
    ...data,
  })

  return res.data.cupom
}

export async function GetAllCupons(ctx: QueryFunctionContext) {
  const [, page] = ctx.queryKey

  const { data } = await apiGateway.get<{ cupons: Cupom[] }>(
    '/cupons?page=' + page,
  )

  return data.cupons
}
