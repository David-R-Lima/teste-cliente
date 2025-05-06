import { QueryFunctionContext } from '@tanstack/react-query'
import {
  Boleto,
  PaymentLink,
  PayPaymentLinkSchema,
  QrCode,
  TypeSchemaLink,
} from './types'
import { api } from '../api'

export async function fetchPaymentLinkForProducts(
  ctx: QueryFunctionContext,
): Promise<{ link: PaymentLink; publicKey: string }> {
  const [, id] = ctx.queryKey

  const res = await api.get<{ link: PaymentLink; publicKey: string }>(
    '/payment-link/for-product/' + id,
  )

  return res.data
}

export async function fetchPaymentLink(
  ctx: QueryFunctionContext,
): Promise<{ link: PaymentLink; publicKey: string }> {
  const [, id] = ctx.queryKey

  const res = await api.get<{ link: PaymentLink; publicKey: string }>(
    '/payment-link/' + id,
  )

  return res.data
}

export async function fetchAllPaymentLink(
  ctx: QueryFunctionContext,
): Promise<PaymentLink[]> {
  const [, page] = ctx.queryKey

  const res = await api.get<{ links: PaymentLink[] }>(
    '/payment-links?page=' + page,
  )

  return res.data.links
}

export async function createPaymentLink(data: TypeSchemaLink) {
  const res = await api.post('/payment-link', data)

  return res.data
}

export async function payPaymentLink(data: PayPaymentLinkSchema) {
  const res = await api.post<{
    charge_id: string
    qr_codes?: QrCode[]
    boleto?: Boleto
  }>('/payment-link/' + data.payment_link_id, data)

  return res.data
}
