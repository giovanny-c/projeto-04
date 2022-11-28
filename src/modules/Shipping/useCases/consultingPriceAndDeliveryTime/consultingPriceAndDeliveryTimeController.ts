import { Request, Response } from "express";
import { container } from "tsyringe";
import { ConsultingPriceAndDeliveryTimeUseCase } from "./consultingPriceAndDeliveryTimeUseCase";


class ConsultingPriceAndDeliveryTimeController {


    async handle(req: Request, res: Response): Promise<Response>{
       
        const {zipcode, product_id, typeOfService} = req.body

        const consulting = container.resolve(ConsultingPriceAndDeliveryTimeUseCase)

        const response = await consulting.execute(zipcode, product_id, typeOfService)

        return res.status(200).json(response)
    }
}

export {ConsultingPriceAndDeliveryTimeController}

