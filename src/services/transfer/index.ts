import { QueryFunctionContext } from '@tanstack/react-query'
import { apiGateway } from '../apiGateway'
import { Transfer } from './types'

export async function GetAllTransfers(ctx: QueryFunctionContext) {
  const [, page] = ctx.queryKey
  const { data } = await apiGateway.get<{ transfers: Transfer[] }>(
    '/transfers' + `?page=${page}`,
  )
  return data
}
