import { QueryFunctionContext } from '@tanstack/react-query'
import { api } from '../api'
import { Product } from '../products/products/types'
import { Order } from './types'

export async function GetOrderById(ctx: QueryFunctionContext) {
  const [, id] = ctx.queryKey
  const res = await api.get<{
    order: Order
    products: Product[]
  }>('/order/' + id)

  return res
}
