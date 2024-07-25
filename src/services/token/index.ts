import { api } from '../api'
export async function CreateToken() {
  const res = await api.post<{ access_token: string }>('/users/tokens')
  return res
}
