import { api } from '@/services/api'
import { Product } from './types'
import { QueryFunctionContext } from '@tanstack/react-query'
import { createProductFormSchema } from '@/app/dashboard/products/components/create-product-form'
import { Boleto, QrCode } from '@/services/payment-link/types'

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
  }

  const res = await api.get<{ products: Product[] }>(
    '/products-recommended' +
      '?merchant_id=' +
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

export async function GetProduct(id: string) {
  const res = await api.get<{ product: Product }>('/product/' + id)

  return res.data
}

interface BuyProductsProps {
  product_ids: string[]
  merchant_id: string
  cupom?: string
  affiliate_id?: string
  card_token?: string
  payment_type: string
  customer: {
    name: string
    email: string
    phone: string
    document: {
      type: string
      text: string
    }
    address: {
      street?: string
      neighbourhood?: string
      number?: string
      complement?: string
      city: string
      state: string
      country: string
      zip_code: string
    }
  }
}

export async function BuyProducts(req: BuyProductsProps) {
  console.log(req)
  const res = await api.post<{
    qr_codes?: QrCode[]
    boleto?: Boleto
  }>('/buy-products', req)

  return res.data
}
