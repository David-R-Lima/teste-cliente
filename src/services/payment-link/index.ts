import { QueryFunctionContext } from '@tanstack/react-query'
import { PaymentLink, TypeSchemaLink } from './types'
import { api } from '../api'

export async function fetchPaymentLink(
  ctx: QueryFunctionContext,
): Promise<PaymentLink> {
  const [, id] = ctx.queryKey

  const res = await api.get<{ link: PaymentLink }>('/payment-link/' + id)

  return res.data.link
}

export async function fetchAllPaymentLink(
  ctx: QueryFunctionContext,
): Promise<PaymentLink[]> {
  const [, id] = ctx.queryKey

  const res = await api.get<{ links: PaymentLink[] }>('/payment-links?page=1')

  return res.data.links
}

export async function createPaymentLink(data: TypeSchemaLink) {
  const res = await api.post('/payment-link', data)

  return res.data
}
