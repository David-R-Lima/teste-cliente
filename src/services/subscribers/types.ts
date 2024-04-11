export interface Subscriber {
    id: string
    customer_id: string
    first_charge: string
    next_charge: string
    last_charge: string
    payment_type: string
    is_active: boolean
    plan_id: string
}