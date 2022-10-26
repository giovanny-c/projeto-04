import { Request, Response } from "express";
import { container } from "tsyringe";
import { TransactionUseCase } from "./TransactionUseCase";


class TransactionController {


    async handle(req: Request, res: Response): Promise<Response>{

        const {
            
        } = req.body

        const {id: customer_id} = req.user
        
        const transaction = container.resolve(TransactionUseCase)

        await transaction.execute()

        return res.status(200).send()

        
        
    }

}

export {TransactionController}