import { Product } from '../products/products/types'

export interface ProductOrders {
  id?: string
  id_order?: string
  id_product?: string
  created_at?: string
  quantity?: number
  product?: Product
}
