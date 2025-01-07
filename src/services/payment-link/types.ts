export interface PaymentLink {
    id: string
    url: string
    name: string
    description: string
    endDate: Date
    value: number
    billingType: string
    chargeType: string
    dueDateLimitDays: number
    subscriptionCycle: string
    maxInstallmentCount: number
    notificationEnabled: boolean
}