import { Request, Response } from "express";
import { container } from "tsyringe";
import { SaveOrderUseCase } from "./SaveOrderUseCase";


class SaveOrderController {


    async handle(req: Request, res: Response): Promise<Response>{

        const {id: customer_id} = req.user
        const {products} = req.body
        

        const saveOrder = container.resolve(SaveOrderUseCase)

        const order = await saveOrder.execute({customer_id, products})

        return res.status(201).json(order)
    }
}

export {SaveOrderController}