import { formSchema } from '@/app/dashboard/plans/components/create-plan-form'
import { Plans } from './types'
import { apiGateway } from '@/services/apiGateway'

export const getPlans = async () => {
  const { data } = await apiGateway.get<{ plans: Plans[] }>('/plans')

  return data
}

export const createPlan = async (formData: formSchema) => {
  const { data } = await apiGateway.post<{ plan: Plans }>('/plans', {
    ...formData,
  })

  return data.plan
}
