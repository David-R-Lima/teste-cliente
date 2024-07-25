import { QueryFunctionContext } from '@tanstack/react-query'
import { Subscriber } from './types'
import { api } from '../api'

export const getSubscriptions = async (ctx: QueryFunctionContext) => {
  const [, page] = ctx.queryKey
  const { data } = await api.get<{ recurrences: Subscriber[] }>(
    '/subscriptions' + `?page=${page}`,
  )

  return data.recurrences
}

interface DeleteSubscription {
  customerId: string
  subscriptionId: string
}

export const deleteSubscription = async ({
  customerId,
  subscriptionId,
}: DeleteSubscription) => {
  await api.delete(`/subscriptions`, {
    data: {
      customer_id: customerId,
      recurrence_id: subscriptionId,
    },
  })
}
