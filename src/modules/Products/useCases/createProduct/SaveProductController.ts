import { IFile } from "@modules/File/dtos/IFileDTO";
import { SaveFileUseCase } from "@modules/File/useCases/saveFile/SaveFileUseCase";
import { SaveFilesForProductUseCase } from "@modules/File/useCases/saveFileForProducts/SaveFilesForProductsUseCase";
import { Request, Response } from "express";
import { type } from "os";
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

            } = req.body

            let { deleted_images_ids } = req.body


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
            // if (deleted_images_ids[0] === "") {
            //     await saveFilesForProductUseCase.execute({
            //         images,
            //         product_id: response.id,
            //         user_id: vendor_id,
            //     })
            // }

            // console.log(deleted_images_ids.split(/S+/))

            if (deleted_images_ids && Array.isArray(deleted_images_ids)) {

                await saveFilesForProductUseCase.execute({
                    images,
                    product_id: response.id,
                    user_id: vendor_id,
                    deleted_images_ids: deleted_images_ids
                })

            } else {
                await saveFilesForProductUseCase.execute({
                    images,
                    product_id: response.id,
                    user_id: vendor_id,
                    deleted_images_ids: [deleted_images_ids] || undefined
                })
            }

            //quando deleta só 1 nao vem em array, vem em string





            return res.status(201).json(response)

        } catch (error) {
            throw error
        }
    }
}

export { SaveProductController }