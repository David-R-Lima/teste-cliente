import { formSchemaCreateBank } from '@/components/create-bank'
import { apiGateway } from '../apiGateway'
import { QueryFunctionContext } from '@tanstack/react-query'
import { BankAccount } from './types'

export const createBankAccount = async (schema: formSchemaCreateBank) => {
  const { data } = await apiGateway.post('/bank-accounts', { ...schema })

  return data
}

export const getBankAccounts = async (ctx: QueryFunctionContext) => {
  const [, page] = ctx.queryKey

  const { data } = await apiGateway.get<{ bank_accounts: BankAccount[] }>(
    '/bank-accounts' + `?page=${page ?? 1}`,
  )

  return data
}
