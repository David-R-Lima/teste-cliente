export interface Transfer {
  id: string
  value: number
  situation: string
  description: string
  bank_account_id: string
  type: string
  reciever_name: string
  reciever_document: string
  created_at: Date
  updated_at: Date | null
}
