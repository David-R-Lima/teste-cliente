import { api } from '../api'
import { ICustomerMetrics } from './types'

export async function CustomerMetrics() {
  const { data } = await api.get<{ customerMetrics: ICustomerMetrics[] }>(
    '/merchant-customer-metrics',
  )
  return data
}

export async function ChargeMetrics() {
  const { data } = await api.get<{ chargeMetrics: ICustomerMetrics[] }>(
    '/merchant-charge-metrics',
  )
  return data
}
