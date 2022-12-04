import { Request, Response } from "express";
import { container } from "tsyringe";
import { AddShippingUseCase } from "./AddShippingUseCase";



class AddShippingController {


    async handle(req: Request, res: Response): Promise<Response>{

        const { type_of_service} = req.body
        const {order_id} = req.params
        //const {products} = req.body
        const {id: user_id} = req.user

        const addShipping = container.resolve(AddShippingUseCase)

        const response = await addShipping.execute({order_id, type_of_service, user_id})

        return res.status(201).json(response)
    }
}

export {AddShippingController}