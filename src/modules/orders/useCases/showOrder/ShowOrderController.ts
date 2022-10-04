
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ShowOrderUseCase } from "./ShowOrderUseCase";


class ShowOrderController {

    async handle(req: Request, res: Response): Promise<Response>{

        const {id: order_id} = req.params

        const showOrder = container.resolve(ShowOrderUseCase)

        const order = await showOrder.execute({id: order_id})

        return res.json(order)
    }
}
export {ShowOrderController}