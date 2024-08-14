import { QueryFunctionContext } from '@tanstack/react-query'
import { api } from '../api'
import { Webhooks } from './types'
import { FormSchemaWebhook } from '@/app/dashboard/webhooks/components/create-webhook'

export const getWebhooks = async (ctx: QueryFunctionContext) => {
  const [, page] = ctx.queryKey

  const { data } = await api.get<{ webhooks: Webhooks[] }>(`webhooks`)

  return data
}

export async function CreateWebhook(data: FormSchemaWebhook) {
  const res = await api.post<{ webhook: Webhooks }>('/webhooks', {
    ...data,
  })

  return res.data.webhook
}
