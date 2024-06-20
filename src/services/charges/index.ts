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
  })

  return data.charge
}
