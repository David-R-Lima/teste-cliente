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

export interface UpdateOrderProps {
  orderId: string
  itens: Product
  type: 'ADD' | 'REMOVE' | 'DECREASE'
}
export async function updateOrder({ itens, orderId, type }: UpdateOrderProps) {
  const res = await api.patch<Order>('/order/' + orderId, {
    itens,
    type,
  })

  return res.data
}

export interface CreateOrderProps {
  itens: string[]
}

export async function createOrder(itens: CreateOrderProps) {
  const res = await api.post('/orders', {
    itens: itens.itens,
  })

  return res.data
}

export async function GetOrders(ctx: QueryFunctionContext) {
  const [, page, filter] = ctx.queryKey

  const res = await api.get<{
    orders: Order[]
  }>(`/orders`, {
    params: {
      page,
      filter: filter ?? undefined,
    },
  })

  return res.data
}
