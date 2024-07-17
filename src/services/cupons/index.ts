import { QueryFunctionContext } from '@tanstack/react-query'
import { apiGateway } from '../apiGateway'
import { Cupom } from './types'

export async function CreateCupom() {
  const { data } = await apiGateway.post<{ cupom: Cupom }>('/cupons')

  return data.cupom
}

export async function GetAllCupons(ctx: QueryFunctionContext) {
  const [, page] = ctx.queryKey

  const { data } = await apiGateway.get<{ cupons: Cupom[] }>(
    '/cupons?page=' + page,
  )

  return data.cupons
}
