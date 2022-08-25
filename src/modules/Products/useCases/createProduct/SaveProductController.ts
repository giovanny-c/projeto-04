import { IFile } from "@modules/File/dtos/IFileDTO";
import { SaveFileUseCase } from "@modules/File/useCases/saveFile/SaveFileUseCase";
import { SaveFilesForProductUseCase } from "@modules/File/useCases/saveFileForProducts/SaveFilesForProductsUseCase";
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
                description,
                deleted_images_ids
            } = req.body

            const images = req.files as IFile[]

            const { id } = req.params

            const { id: vendor_id } = req.user

            const saveFilesForProductUseCase = container.resolve(SaveFilesForProductUseCase)

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



            //deletar imgs que foram passadas no edit
            //so permitir 4 imgs por produto / countImg - deleteImg = ?

            //para o delete images nao entrar como array com strings ""
            //pensar em algo melhor
            if (deleted_images_ids[0] === "") {
                await saveFilesForProductUseCase.execute({
                    images,
                    product_id: response.id,
                    user_id: vendor_id,
                })
            }

            await saveFilesForProductUseCase.execute({
                images,
                product_id: response.id,
                user_id: vendor_id,
                deleted_images_ids
            })



            return res.status(201).json(response)

        } catch (error) {
            throw error
        }
    }
}

export { SaveProductController }