import { Request, Response } from "express";
import { container } from "tsyringe";
import { ConsultingPriceAndDeliveryTimeUseCase } from "./consultingPriceAndDeliveryTimeUseCase";


class ConsultingPriceAndDeliveryTimeController {


    async handle(req: Request, res: Response): Promise<Response>{
       
        const {zipcode, type_of_service} = req.body
        const {product_id} = req.params
        const consulting = container.resolve(ConsultingPriceAndDeliveryTimeUseCase)

        const response = await consulting.execute(zipcode, product_id, type_of_service)

        return res.status(200).json(response)
    }
}

export {ConsultingPriceAndDeliveryTimeController}

