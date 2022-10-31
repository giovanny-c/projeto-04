import Order from "@modules/Orders/entities/Order";
import { ProcessOrderUseCase } from "@modules/Orders/useCases/processOrder/ProcessOrderUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { PagarMePostBackUseCase } from "./PagarMePostBackUseCase";



class PagarMePostBackController {


    async handle(req: Request, res: Response): Promise<Response>{

        
        const postBackBody = req.body

        const signature = req.headers["X-Hub-Signature"] as string
        

        const transaction = container.resolve(PagarMePostBackUseCase)

        const transaction_response = await transaction.execute({
            postBackBody, signature
        })

        if(transaction_response.status && transaction_response.status === 404){
            return res.status(404).json()
        }

        

        const processOrder = container.resolve(ProcessOrderUseCase)

        await processOrder.execute({order: transaction_response as Order})
        


       return res.status(200).json()

        
        
    }

}

export {PagarMePostBackController}