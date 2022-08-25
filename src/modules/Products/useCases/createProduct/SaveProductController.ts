import { IFile } from "@modules/File/dtos/IFileDTO";
import { SaveFileUseCase } from "@modules/File/useCases/saveFile/SaveFileUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { SaveProductUseCase } from "./SaveProductUseCase";



class SaveProductController {


    async handle(req: Request, res: Response): Promise<Response> {

        try {



            const {
                name,
                price,
                available,
                quantity,
                description
            } = req.body


            const images = req.files as IFile[]

            const { id } = req.params

            const { id: vendor_id } = req.user

            const saveFileUseCase = container.resolve(SaveFileUseCase)

            const saveProductUseCase = container.resolve(SaveProductUseCase)

            const response = await saveProductUseCase.execute({
                id,
                name,
                vendor_id,
                price,
                description,
                available,
                quantity
            })

            images.forEach(async (file) => {

                await saveFileUseCase.execute({
                    user_id: vendor_id,
                    name: file.filename,
                    is_public: true,
                    mime_type: file.mimetype,
                    path: file.path,
                    size: file.size
                })
            })

            return res.status(201).json(response)

        } catch (error) {
            throw error
        }
    }
}

export { SaveProductController }