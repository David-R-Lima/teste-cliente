import { api } from '../api'

export async function generateCode({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const data = await api.post('/sessions', {
    email,
    password,
  })

  return data
}
