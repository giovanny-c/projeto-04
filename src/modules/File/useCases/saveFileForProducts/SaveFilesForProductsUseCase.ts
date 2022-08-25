
import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { IStorageProvider } from "@shared/container/providers/storageProvider/IStorageProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ISaveFile } from "../../dtos/ISaveFileDTO";
import { File } from "../../entities/File";
import { IFileRepository } from "../../repositories/IFileRepository";

import * as fs from "fs"
import { ISaveFileRequest } from "../saveFile/SaveFileDTO";
import { IFile } from "@modules/File/dtos/IFileDTO";
import { ISaveFileForProductsRequest } from "./SaveFilesForProductsDTO";


@injectable()
class SaveFilesForProductUseCase {

    constructor(
        @inject("FileRepository")
        private fileRepository: IFileRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) {

    }

    async execute({ images, product_id, user_id, deleted_images_ids }: ISaveFileForProductsRequest): Promise<void> {
        try {


            const userExists = await this.usersRepository.findById(user_id)

            if (!userExists) {
                throw new AppError("User not found", 400)
            }

            //count images
            let imageCount = await this.fileRepository.countFilesByProductId(product_id)

            if (images && deleted_images_ids) {

                if (imageCount - deleted_images_ids.length + images.length > 4) {
                    throw new AppError("The product should contain less than 4 images", 400)
                }

                //delete img
                deleted_images_ids.forEach(async (id) => {

                    const file = await this.fileRepository.findById(id)

                    await this.storageProvider.delete({ file: file.name, folder: file.mime_type })

                    await this.fileRepository.delete(id)
                })

                // add new image
                images.forEach(async (image) => {


                    let [, file_extension] = image.filename.split(/\.(?!.*\.)/, 2)



                    //salva no storage
                    await this.storageProvider.save({ file: image.filename, folder: image.mimetype })

                    //salva no bd
                    return await this.fileRepository.save({
                        user_id,
                        product_id,
                        name: image.filename,
                        mime_type: image.mimetype,
                        created_at: this.dateProvider.dateNow(),
                        size: image.size,
                        storage_type: process.env.STORAGE,
                        extension: file_extension,
                        permission: "public"
                    })
                })

            }

            if (!images && deleted_images_ids) {

                //delete img
                deleted_images_ids.forEach(async (id) => {

                    const file = await this.fileRepository.findById(id)

                    await this.storageProvider.delete({ file: file.name, folder: file.mime_type })

                    await this.fileRepository.delete(id)
                })
            }

            if (images && !deleted_images_ids) {
                // add new image

                if (imageCount + images.length > 4) {
                    throw new AppError("The product should contain less than 4 images", 400)
                }

                images.forEach(async (image) => {


                    let [, file_extension] = image.filename.split(/\.(?!.*\.)/, 2)



                    //salva no storage
                    await this.storageProvider.save({ file: image.filename, folder: image.mimetype })

                    //salva no bd
                    return await this.fileRepository.save({
                        user_id,
                        product_id,
                        name: image.filename,
                        mime_type: image.mimetype,
                        created_at: this.dateProvider.dateNow(),
                        size: image.size,
                        storage_type: process.env.STORAGE,
                        extension: file_extension,
                        permission: "public"
                    })
                })
            }



            //PERMITIR SO AULGUNS TIPOS DE ARQUIVO
        } catch (error) {
            throw error
        }

    }
}

export { SaveFilesForProductUseCase }