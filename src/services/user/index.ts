import { QueryFunctionContext } from '@tanstack/react-query'
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

export async function FetchPubKey(ctx: QueryFunctionContext) {
  const [, id] = ctx.queryKey

  const res = await api.get<{ key: string }>('/credit-card-key?id=' + id)

  return res.data
}

export async function alterPasswordGenerateCode({ email }: { email: string }) {
  const res = await api.post<{ message: string }>('/alter-password', {
    email,
  })

  return res.data
}

export async function alterPassword({
  email,
  code,
  password,
  passwordConfirmation,
}: {
  email: string
  code: string
  password: string
  passwordConfirmation: string
}) {
  const res = await api.put<{ message: string }>('/alter-password', {
    email,
    code,
    password,
    password_confirmation: passwordConfirmation,
  })

  return res.data
}
