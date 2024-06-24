import { QueryFunctionContext } from '@tanstack/react-query'
import { apiGateway } from '../apiGateway'
import { Subscriber } from './types'

export const getSubscriptions = async (ctx: QueryFunctionContext) => {
  const [, page] = ctx.queryKey
  const { data } = await apiGateway.get<{ recurrences: Subscriber[] }>(
    '/subscriptions' + `?page=${page}`,
  )

  console.log(data.recurrences)

  return data.recurrences
}
