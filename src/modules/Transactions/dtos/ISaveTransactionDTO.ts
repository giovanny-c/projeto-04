import { User } from "@modules/Accounts/entities/User"
import { TransactionStatus } from "../types/TransactionStatus"



export default interface ISaveTransaction{

    id?: string

    transaction_id: string

    transaction_code: string

    status: TransactionStatus //Enumerator?

    payment_type: string //Enumerator

    installments: number
    
    total: number

    processor_response?: string

    order_id: string

    vendor_id?: string

    vendor?: User

    customer_id: string

    customer?: User

    //passar todos os campos de customer e billing para tb User

    customer_name: string

    customer_email: string

    customer_mobile?: string

    customer_document?: string

    billing_address?: string

    billing_number?: string

    billing_neighborhood?: string

    billing_city?: string

    billing_state?: string

    billing_zipcode?: string

    created_at?: Date
    
    updated_at?: Date
    
} 