import { User } from "../../Accounts/entities/User";
import Order from "../../Orders/entities/Order";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import {v4 as uuidV4} from "uuid"
import { TransactionStatus } from "../types/TransactionStatus";


@Entity("transactions")
class Transaction {

    @PrimaryColumn()
    id: string //id gerado pelo DB

    @Column() //id gerado pelo gateway
    transaction_id: string

    @Column() //codigo gerado app?
    transaction_code: string

    @Column()
    status: string //Enumerator?

    @Column()
    payment_type: string //Enumerator

    @Column()
    installments: number
    
    @Column("decimal")
    total: number

    @Column()
    processor_response: string

    @Column()
    order_id: string

    @ManyToOne(() => Order)
    @JoinColumn({ name: "order_id" })
    order: User

    @Column()
    vendor_id: string

    @ManyToOne(() => User)
    @JoinColumn({ name: "vendor_id" })
    vendor: User

    @Column()
    customer_id: string

    @ManyToOne(() => User)
    @JoinColumn({ name: "customer_id" })
    customer: User

    //passar todos os campos de customer e billing para tb User

    @Column()
    customer_name: string

    @Column()
    customer_email: string

    @Column()
    customer_mobile: string

    @Column()
    customer_document: string

    @Column()
    billing_address: string

    @Column()
    billing_number: string

    @Column()
    billing_neighborhood: string

    @Column()
    billing_city: string

    @Column()
    billing_state: string

    @Column()
    billing_zipcode: string

    @Column()
    created_at: Date
    
    @Column()
    updated_at: Date

    
    constructor(){
        if(!this.id){
            this.id = uuidV4()
        }
    }

}

export {Transaction}