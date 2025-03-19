import { QueryFunctionContext } from '@tanstack/react-query'
import { api } from '../api'
import { RequestLogs } from './types'

export async function GetRequestLogs(ctx: QueryFunctionContext) {
  const [, page] = ctx.queryKey
  const { data } = await api.get<{ requests: RequestLogs[] }>(
    `/requests?page=${page}`,
  )

  return data
}
