export interface Charges {
    id: string
    merchant_id: string
    value: string
    currency: string
    invoice_description: string
    capture: boolean
    provider_id: string
    description: string
    situation: string
    charge_type: string
    card_id: string
    pix_id: string
    payment_type: string
    nsu: string
    customer_id?: string
    recurrence_id?: string
    payer: {
        name: string
        email: string
        phone: string
    }
    address?: {
        street: string
        number: string
        country: string
    }
    created_at: string
    updated_at?: string
}