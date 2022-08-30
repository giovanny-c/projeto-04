import { GetFilesFromUserUseCase } from "@modules/File/useCases/getFilesFromUser/GetFilesFromUserUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetProductUseCase } from "./GetProductUseCase";




class GetProductController {

    async handle(req: Request, res: Response) {

        const { product_id } = req.params

        const getProductUseCase = container.resolve(GetProductUseCase)

        const product = await getProductUseCase.execute(product_id)

        return res.json(product)

    }

}

export { GetProductController }