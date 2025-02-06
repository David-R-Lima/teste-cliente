import { api } from '../api'
import { ICustomerMetrics } from './types'

export async function CustomerMetrics() {
  const { data } = await api.get<{ customerMetrics: ICustomerMetrics[] }>(
    '/merchant-customer-metrics',
  )
  return data
}
