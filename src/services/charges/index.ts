import { QueryFunctionContext } from '@tanstack/react-query'
import { Charges } from './types'
import { formSchema } from '@/app/dashboard/charges/components/create-charge-form'
import { apiGateway } from '../apiGateway'

export const getCharges = async (ctx: QueryFunctionContext) => {
  const [, page] = ctx.queryKey
  const { data } = await apiGateway.get<{ charges: Charges[] }>(
    '/charges?page=' + page,
  )

  return data.charges
}

export const createCharge = async (formData: formSchema) => {
  const { data } = await apiGateway.post<{ charge: Charges }>('/charges', {
    ...formData,
    value: formData.value * 100,
  })

  return data.charge
}

interface RefundRequest {
  chargeId: string
  reason: string
}

export const refundCharge = async ({ chargeId, reason }: RefundRequest) => {
  const { data } = await apiGateway.post(`/charges/${chargeId}/void`, {
    reason,
  })

  return data.refund
}
