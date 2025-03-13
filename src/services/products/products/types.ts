export interface Product {
  id: string | null
  name: string | null
  description: string | null
  value: number | null
  active: boolean | null
  image_url: string | null
  quantity?: number | null
  createdAt: Date | null
  updatedAt: Date | null
}
