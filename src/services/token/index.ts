import { apiGateway } from '../apiGateway'
export async function CreateToken() {
  const res = await apiGateway.post<{ access_token: string }>('/users/tokens')
  return res
}
