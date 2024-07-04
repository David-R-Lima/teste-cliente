import { formSchemaCreateBank } from '@/components/create-bank'
import { apiGateway } from '../apiGateway'

export const createBank = async (schema: formSchemaCreateBank) => {
  const { data } = await apiGateway.post('/bank-accounts', { ...schema })

  return data
}
