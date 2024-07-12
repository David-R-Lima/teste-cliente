import { formSchemaCreatePixKey } from '@/components/create-pix-key-dialog'
import { apiGateway } from '../apiGateway'
import { PixKey } from './types'

export const getPixKeys = async () => {
  const { data } = await apiGateway.get<{ pix_key: PixKey }>('/pix-keys')

  return data.pix_key
}

export const createPixKey = async (schema: formSchemaCreatePixKey) => {
  const { data } = await apiGateway.post<{ pix_key: PixKey }>('/pix-keys', {
    ...schema,
  })

  return data.pix_key
}
