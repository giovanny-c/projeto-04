import { DeleteFilesForProductsUseCase } from "@modules/File/useCases/deleteFilesForProducts/DeleteFilesForProductsUseCase"
import { Request, Response } from "express"
import { container } from "tsyringe"
import { DeleteProductUseCase } from "./DeleteProductUseCase"

class DeleteProductController {


    async handle(req: Request, res: Response): Promise<Response> {
        try {


            const { id: user_id } = req.user
            const { product_id } = req.body || req.params

            const deleteProductController = container.resolve(DeleteProductUseCase)

            const deleteFilesForProducts = container.resolve(DeleteFilesForProductsUseCase)

            const productId = await deleteProductController.execute(user_id, product_id)

            await deleteFilesForProducts.execute(productId)

            return res.status(200).send()

        } catch (error) {
            throw error
        }
    }
}

export { DeleteProductController }