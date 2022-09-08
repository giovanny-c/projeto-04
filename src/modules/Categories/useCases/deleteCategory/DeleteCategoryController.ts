import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";

class DeleteCategoryController {

    async handle(req: Request, res: Response): Promise<Response> {
        try {


            const { id } = req.body || req.params

            const deleteCategoryUseCase = container.resolve(DeleteCategoryUseCase)

            const response = await deleteCategoryUseCase.execute(id)

            return res.status(201).json(response)

        } catch (error) {
            throw error
        }
    }

}

export { DeleteCategoryController }