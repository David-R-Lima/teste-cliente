export enum DocumentType {
  CPF = 'CPF',
  CNPJ = 'CNPJ',
}

export enum Country {
  BR = 'BR',
}

export interface Customers {
  id: string
  merchant_id: string
  name: string
  email: string
  phone: string
  is_active: boolean
  document?: {
    text: string
    type: DocumentType
    country: string
  }
  created_at: string
  updated_at?: string
}
