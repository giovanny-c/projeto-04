
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowVendorOrdersUseCase } from "./ShowVendorOrderUseCase";


class ShowVendorOrderController {


    async handle(req: Request, res: Response): Promise<Response> {

        const {id: vendor_id } = req.user
        const {order_id} = req.params

        const ShowVendorOrder = container.resolve(ShowVendorOrdersUseCase)

        const order = await ShowVendorOrder.execute({order_id, vendor_id})

        return res.status(200).json(order)

    }
}

export { ShowVendorOrderController }