import { Request, Response } from "express";
import { container } from "tsyringe";
import { ProcessPaymentUseCase } from "./ProcessPaymentUseCase";


class ProcessPaymentController {


    async handle(req: Request, res: Response): Promise<Response>{

        
        const processPayment = container.resolve(ProcessPaymentUseCase)

        await processPayment.execute("")

        return res.status(200).send()

        
        
    }

}

export {ProcessPaymentController}