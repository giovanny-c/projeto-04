import { Request, Response } from "express";
import { container } from "tsyringe";
import { SaveCategoryUseCase } from "./SaveCategoryUseCase";


class SaveCategoryController {

    async handle(req: Request, res: Response): Promise<Response> {
        try {


            const {
                name,
                description,
                id
            } = req.body

            const saveCategoryUseCase = container.resolve(SaveCategoryUseCase)

            const response = await saveCategoryUseCase.execute(name, description, id)

            return res.status(201).json(response)

        } catch (error) {
            throw error
        }
    }

}

export { SaveCategoryController }