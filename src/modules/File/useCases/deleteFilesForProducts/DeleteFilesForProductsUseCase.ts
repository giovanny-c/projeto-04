import { File } from "@modules/File/entities/File";
import { IFileRepository } from "@modules/File/repositories/IFileRepository";
import { IStorageProvider } from "@shared/container/providers/storageProvider/IStorageProvider";
import { inject, injectable } from "tsyringe";

@injectable()
class DeleteFilesForProductsUseCase {

    constructor(
        @inject("FileRepository")
        private filesRepository: IFileRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) { }

    async execute(product_id): Promise<void> {
        try {


            const files = await this.filesRepository.getFileUrlByIdOrProductId(product_id) as File[]

            files.forEach(async (file) => {

                await this.storageProvider.delete({ file: file.name, folder: file.mime_type })

                await this.filesRepository.delete(file.id)
            });


        } catch (error) {
            throw error
        }
    }

}

export { DeleteFilesForProductsUseCase }