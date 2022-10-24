
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListVendorOrdersUseCase } from "./ListVendorOrdersUseCase";


class ListVendorOrdersController {


    async handle(req: Request, res: Response): Promise<Response> {

        const {id: vendor_id } = req.user

        const listVendorOrders = container.resolve(ListVendorOrdersUseCase)

        const orders = await listVendorOrders.execute(vendor_id)

        return res.status(200).json(orders)

    }
}

export { ListVendorOrdersController }