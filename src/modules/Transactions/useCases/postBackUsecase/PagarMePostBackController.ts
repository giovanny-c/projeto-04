import { Request, Response } from "express";
import { parsePhoneNumber } from "libphonenumber-js";
import { container } from "tsyringe";
import { PagarMePostBackUseCase } from "./PagarMePostBackUseCase";



class PagarMePostBackController {


    async handle(req: Request, res: Response): Promise<Response>{

        
        const {
            id,
            object,
            current_status
        } = req.body

        

        const transaction = container.resolve(PagarMePostBackUseCase)

        const response = await transaction.execute({
            transaction_id: id, object, current_status
        })

        if(response.status && response.status === 404){
            return res.status(404).json()
        }

       return res.status(200).json(response)

        
        
    }

}

export {PagarMePostBackController}