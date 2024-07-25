import { QueryFunctionContext } from '@tanstack/react-query'
import { Charges } from './types'
import { formSchema } from '@/app/dashboard/charges/components/create-charge-form'
import { apiGateway } from '../apiGateway'
import { AxiosError } from 'axios'
import { api } from '../api'

export const getCharges = async (ctx: QueryFunctionContext) => {
  const [, page] = ctx.queryKey
  const { data } = await api.get<{ charges: Charges[] }>(
    '/charges?page=' + page,
  )

  return data.charges
}

export const createCharge = async (formData: formSchema) => {
  try {
    const { data } = await api.post<{ charge: Charges }>('/charges', {
      ...formData,
      value: formData.value * 100,
    })

    console.log(data)
    return data.charge
  } catch (error) {
    console.log('error: ', error)
    if (error instanceof AxiosError) {
      throw new Error(`${error?.response?.data?.message}`)
    } else {
      throw new Error('Error ao criar cobrança')
    }
  }
}

interface RefundRequest {
  chargeId: string
  reason: string
}

export const refundCharge = async ({ chargeId, reason }: RefundRequest) => {
  const { data } = await api.post(`/charges/${chargeId}/void`, {
    reason,
  })

  return data.refund
}

export const getChargeById = async (ctx: QueryFunctionContext) => {
  const [, chargeId] = ctx.queryKey

  const { data } = await api.get<{ charge: Charges }>(`/charges/${chargeId}`)

  return data.charge
}
