import { Request, Response } from "express";
import { container } from "tsyringe";
import { TransactionUseCase } from "./TransactionUseCase";


class TransactionController {


    async handle(req: Request, res: Response): Promise<Response>{

        
        const {
            order_id,
            payment_type,
            installments,
            customer_document,
            customer_email, 
            customer_mobile, //max 12 char com numero apenas
            customer_name,//min characters
            billing_address,
            billing_city, 
            billing_neighborhood,
            billing_number,
            billing_state, 
            billing_zipcode,
            card_number,
            card_expiration,
            card_holderName,
            card_cvv,
        } = req.body
        
        const {id: customer_id} = req.user

        const customer = {
            id: customer_id,
            name: customer_name,
            email: customer_email,
            mobile: customer_mobile,
            document: customer_document
        }

        const billing = {
            address: billing_address,
            number: billing_number,
            neighborhood: billing_neighborhood,
            city: billing_city,
            state: billing_state,
            zipcode: billing_zipcode
        }

        const card = {
            number: card_number,
            expiration: card_expiration,
            holder_name: card_holderName,
            cvv: card_cvv
        }

        return res.send()
        
        const transaction = container.resolve(TransactionUseCase)
        // const response = await transaction.execute({
        //     order_id,
        //     payment_type,
        //     installments,
        //     customer,
        //     billing,
        //     card
        // })

       // return res.status(200).json(response)

        
        
    }

}

export {TransactionController}