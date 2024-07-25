import { formSchemaCreatePixKey } from '@/components/create-pix-key-dialog'
import { PixKey } from './types'
import { api } from '../api'

export const getPixKeys = async () => {
  const { data } = await api.get<{ pix_key: PixKey }>('/pix-keys')

  return data.pix_key
}

export const createPixKey = async (schema: formSchemaCreatePixKey) => {
  const { data } = await api.post<{ pix_key: PixKey }>('/pix-keys', {
    ...schema,
  })

  return data.pix_key
}
