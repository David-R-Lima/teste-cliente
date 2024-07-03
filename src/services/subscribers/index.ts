import { QueryFunctionContext } from '@tanstack/react-query'
import { apiGateway } from '../apiGateway'
import { Subscriber } from './types'
import { formSchema } from '@/app/dashboard/customers/components/create-card'

export const getSubscriptions = async (ctx: QueryFunctionContext) => {
  const [, page] = ctx.queryKey
  const { data } = await apiGateway.get<{ recurrences: Subscriber[] }>(
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
  await apiGateway.delete(`/subscriptions`, {
    data: {
      customer_id: customerId,
      recurrence_id: subscriptionId,
    },
  })
}
