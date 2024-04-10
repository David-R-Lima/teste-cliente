export interface Customers {
    id: string
    merchant_id: string
    name: string
    email: string
    phone: string
    is_active: boolean
    document?: {
        text: string
        document_type: string
        country: string
    }
    created_at: string
    updated_at?: string
}