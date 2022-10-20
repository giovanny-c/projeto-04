
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ShowVendorOrdersUseCase } from "./ShowVendorOrdersUseCase";


class ShowVendorOrdersController {


    async handle(req: Request, res: Response): Promise<Response> {

        const {id: vendor_id } = req.user

        const showVendorOrders = container.resolve(ShowVendorOrdersUseCase)

        const orders = await showVendorOrders.execute(vendor_id)

        return res.status(200).json(orders)

    }
}

export { ShowVendorOrdersController }