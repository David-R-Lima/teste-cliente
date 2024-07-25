import { formSchema } from '@/app/dashboard/plans/components/create-plan-form'
import { Plans } from './types'
import { QueryFunctionContext } from '@tanstack/react-query'
import { api } from '@/services/api'

export const getPlans = async (ctx: QueryFunctionContext) => {
  const [, page] = ctx.queryKey

  const { data } = await api.get<{ plans: Plans[] }>('/plans' + `?page=${page}`)

  return data
}

export const createPlan = async (formData: formSchema) => {
  const { data } = await api.post<{ plan: Plans }>('/plans', {
    ...formData,
    value: formData.value * 100,
  })

  return data.plan
}
