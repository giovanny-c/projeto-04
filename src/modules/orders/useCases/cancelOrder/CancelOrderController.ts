import { Request, Response } from "express";
import { container } from "tsyringe";
import { CancelOrderUseCase } from "./CancelOrderUseCase";


class CancelOrderController {


    async handle(req: Request, res: Response): Promise<Response>{

        const {id: customer_id} = req.user
        //const {products} = req.body
        const {order_id} = req.params
        

        const cancelOrder = container.resolve(CancelOrderUseCase)

        const order = await cancelOrder.execute({customer_id, order_id})

        return res.status(200).json(order)
    }
}

export {CancelOrderController}