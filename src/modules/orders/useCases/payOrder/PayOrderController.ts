import { Request, Response } from "express";
import { container } from "tsyringe";
import { PayOrderUseCase } from "./PayOrderUseCase";


class PayOrderController {


    async handle(req: Request, res: Response): Promise<Response>{

        const {id: user_id} = req.user
       
        const {order_id} = req.params

        const {payment_validation} = req.body

        const payOrder = container.resolve(PayOrderUseCase)

        const order = await payOrder.execute({order_id, user_id, payment_validation})

        return res.status(200).json(order)
    }
}

export {PayOrderController}