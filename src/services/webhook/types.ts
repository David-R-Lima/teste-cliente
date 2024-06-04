export interface MerchantSetting {
    id: string;
    merchant_parameter_id: string;
    merchant_id: string
    type_string?: string;
    money?: number
    integer?: number
    logic?: boolean
    date?: Date
    created_at: Date;
    updated_at?: Date;
}