import { QueryFunctionContext } from '@tanstack/react-query'
import { api } from '../api'
import { Charges } from './types'
import { formSchema } from '@/app/dashboard/charges/components/create-charge-form'

export const getCharges = async (ctx: QueryFunctionContext) => {
  const [, page] = ctx.queryKey
  const { data } = await api.get<{ charges: Charges[] }>(
    '/charges?page=' + page,
  )

  return data.charges
}

export const createCharge = async (formData: formSchema) => {
  const { data } = await api.post<{ charge: Charges }>('/charges', {
    ...formData,
  })

  return data.charge
}
