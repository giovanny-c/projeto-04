
import { Request, Response } from "express"
import { container } from "tsyringe"
import { ShowCustomersOrdersUseCase } from "./ShowCustomerOrdersUseCase"

class ShowCustomersOrdersController {


    async handle(req: Request, res: Response): Promise<Response> {
        
        const {id: customer_id} = req.user

        const showCustomerOrders = container.resolve(ShowCustomersOrdersUseCase)

        const orders = await showCustomerOrders.execute({customer_id})

        return res.status(200).json(orders)
    }
}