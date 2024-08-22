import { apiGateway } from '../apiGateway'
import { Health } from './types'

export async function VerifyHealth() {
  const res = await apiGateway.get<{ health: Health }>('/health')
  return res.data
}
