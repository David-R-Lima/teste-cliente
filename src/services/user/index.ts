import { api } from '../api'

export async function generateCode({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const data = await api.post<{ valid: boolean; user_id: string }>(
    '/sessions',
    {
      email,
      password,
    },
  )

  return data
}
