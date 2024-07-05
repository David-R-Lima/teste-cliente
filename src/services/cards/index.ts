import { formSchema } from '@/app/dashboard/customers/components/create-card'
import { apiGateway } from '../apiGateway'
import { Card } from './types'

interface GetCardRequest {
  customerId: string
}

export async function getCards({ customerId }: GetCardRequest) {
  const { data } = await apiGateway.get<{ creditCards: Card[] }>(
    `/customers/${customerId}/cards`,
  )
  return data
}

interface DeleteCardRequest {
  cardId: string
}

export async function deleteCard({ cardId }: DeleteCardRequest) {
  try {
    await apiGateway.delete(`/cards/${cardId}`)
  } catch (error) {
    throw new Error('Error deletar cartão')
  }
}

export async function createCard(formData: formSchema) {
  const { data } = await apiGateway.post<{ creditCard: Card }>(
    `/customers/${formData.customer_id}/cards`,
    {
      card_token: formData.token,
    },
  )

  return data.creditCard
}
