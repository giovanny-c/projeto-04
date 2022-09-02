import { File } from "@modules/File/entities/File";
import { FileMap } from "@modules/File/mapper/FileMap";
import { IFileRepository } from "@modules/File/repositories/IFileRepository";
import { IProductResponse } from "@modules/Products/dtos/IProductResponseDTO";
import { Product } from "@modules/Products/entities/Product";
import { IProductsRepository } from "@modules/Products/repositories/IProductsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";


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

        let product = await this.productsRepository.findById(id)

        if (!product) {
            throw new AppError("No product found", 404)
        }

        const files = await this.fileRepository.getFileUrlByIdOrProductId({ product_id: id }) as File[]

        const files_url = files.map(file => {
            return FileMap.return_URL(file)
        })

        return Object.assign(product, {
            files: files_url
        })


    }
}

export { GetProductUseCase }