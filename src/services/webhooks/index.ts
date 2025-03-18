import { QueryFunctionContext } from '@tanstack/react-query'
import { api } from '../api'
import { SentWebhooks, Webhooks, WebhookTemplateStatus } from './types'
import { FormSchemaWebhook } from '@/app/dashboard/webhooks/components/create-webhook'
import { updateFormSchemaWebhook } from '@/app/dashboard/webhooks/components/update-webhook-form'

export const getWebhooks = async (ctx: QueryFunctionContext) => {
  const [,] = ctx.queryKey

  const { data } = await api.get<{ webhooks: Webhooks[] }>(`webhooks`)

  return data
}

export async function CreateWebhook(data: FormSchemaWebhook) {
  const status = data.status
    ? WebhookTemplateStatus.ACTIVE
    : WebhookTemplateStatus.INACTIVE

  const res = await api.post<{ webhook: Webhooks }>('/webhooks', {
    ...data,
    status,
  })

  return res.data.webhook
}

export async function UpdateWebhook(data: updateFormSchemaWebhook) {
  const status = data.status
    ? WebhookTemplateStatus.ACTIVE
    : WebhookTemplateStatus.INACTIVE

  const res = await api.patch<{ webhook: Webhooks }>('/webhooks/' + data.id, {
    ...data,
    status,
  })

  return res.data.webhook
}

export async function GetSentWebhooks(ctx: QueryFunctionContext) {
  const [, page] = ctx.queryKey

  const { data } = await api.get<{
    totalDocuments: number
    totalPages: number
    webhooks: SentWebhooks[]
  }>('/sent-webhooks?page=' + page)

  return data
}
