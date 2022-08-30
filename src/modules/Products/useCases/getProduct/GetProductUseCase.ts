import { File } from "@modules/File/entities/File";
import { FileMap } from "@modules/File/mapper/FileMap";
import { IFileRepository } from "@modules/File/repositories/IFileRepository";
import { Product } from "@modules/Products/entities/Product";
import { IProductsRepository } from "@modules/Products/repositories/IProductsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IProductResponse {

    product: Product
    files: {
        id: string
        file_url: () => string
    }[]

}

@injectable()
class GetProductUseCase {


    constructor(
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository,
        @inject("FileRepository")
        private fileRepository: IFileRepository
    ) {
    }

    async execute(id: string): Promise<IProductResponse> {

        const product = await this.productsRepository.findById(id)

        if (!product) {
            throw new AppError("No product found", 404)
        }

        const files = await this.fileRepository.getFileUrlByIdOrProductId({ product_id: id }) as File[]

        const files_url = files.map(file => {
            return FileMap.return_URL(file)
        })

        return {
            product,
            files: files_url
        }
    }
}

export { GetProductUseCase }