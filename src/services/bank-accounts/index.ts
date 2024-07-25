import { formSchemaCreateBank } from '@/components/create-bank'
import { QueryFunctionContext } from '@tanstack/react-query'
import { BankAccount } from './types'
import { api } from '../api'

export const createBankAccount = async (schema: formSchemaCreateBank) => {
  const { data } = await api.post('/bank-accounts', { ...schema })

  return data
}

export const getBankAccounts = async (ctx: QueryFunctionContext) => {
  const [, page] = ctx.queryKey

  const { data } = await api.get<{ bank_accounts: BankAccount[] }>(
    '/bank-accounts' + `?page=${page ?? 1}`,
  )

  return data
}
