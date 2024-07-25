import { formSchema } from '@/app/dashboard/customers/components/create-card'
import { Card } from './types'
import { api } from '../api'

interface GetCardRequest {
  customerId: string
}

export async function getCards({ customerId }: GetCardRequest) {
  const { data } = await api.get<{ creditCards: Card[] }>(
    `/customers/${customerId}/cards`,
  )
  return data
}

interface DeleteCardRequest {
  cardId: string
}

export async function deleteCard({ cardId }: DeleteCardRequest) {
  try {
    await api.delete(`/cards/${cardId}`)
  } catch (error) {
    throw new Error('Error deletar cartão')
  }
}

export async function createCard(formData: formSchema) {
  const { data } = await api.post<{ creditCard: Card }>(
    `/customers/${formData.customer_id}/cards`,
    {
      card_token: formData.token,
    },
  )
  return data.creditCard
}
