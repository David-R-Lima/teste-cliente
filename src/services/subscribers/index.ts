import { apiGateway } from '../apiGateway'
import { Subscriber } from './types'

export const getSubscriptions = async () => {
  const { data } = await apiGateway.get<{ subscribers: Subscriber[] }>(
    '/subscriptions',
  )

  return data.subscribers
}
