import { api } from '@/services/api'
import { Product } from './types'
import { QueryFunctionContext } from '@tanstack/react-query'
import { createProductFormSchema } from '@/app/dashboard/products/components/create-product-form'

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

export async function GetProducts(ctx: QueryFunctionContext) {
  const [, page] = ctx.queryKey

  const res = await api.get<{ products: Product[] }>('/products?page=' + page)

  return res.data
}

export async function CreateProduct(data: createProductFormSchema) {
  const res = await api.post('/products', data)

  return res.data
}
