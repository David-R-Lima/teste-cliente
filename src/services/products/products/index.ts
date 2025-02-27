import { api } from '@/services/api'
import { Product } from './types'

export interface GetRecommendedProductsProps {
  merchantId: string
  excludedItens?: string[]
}

export async function GetRecommendedProducts({
  excludedItens,
  merchantId,
}: GetRecommendedProductsProps) {
  const params: Record<string, string> = {}

  if (excludedItens && excludedItens.length > 0) {
    params.excludedItens = excludedItens.join(',')
    params.merchantId = merchantId
  }

  const res = await api.get<{ products: Product[] }>(
    '/products-recommended' +
      '?merchantId=' +
      merchantId +
      '&excludedItens=' +
      params.excludedItens,
  )

  return res.data
}
