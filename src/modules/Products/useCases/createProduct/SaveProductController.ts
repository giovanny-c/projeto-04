import { Request, Response } from "express";
import { container } from "tsyringe";
import { SaveProductUseCase } from "./SaveProductUseCase";



class SaveProductController {


    async handle(req: Request, res: Response): Promise<Response> {

        const {
            price,
            available,
            quantity,
            description
        } = req.body

        const { id } = req.params

        const { id: vendor_id } = req.user

        const saveProductUseCase = container.resolve(SaveProductUseCase)

        const response = await saveProductUseCase.execute({
            id,
            vendor_id,
            price,
            description,
            available,
            quantity
        })


        return res.status(201).json(response)
    }
}

export { SaveProductController }