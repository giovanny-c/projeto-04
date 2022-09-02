import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";
import { File } from "@modules/File/entities/File";
import { FileMap } from "@modules/File/mapper/FileMap";
import { IFileRepository } from "@modules/File/repositories/IFileRepository";
import { IFindProducts } from "@modules/Products/dtos/IFindProductsDTO";
import { IProductResponse } from "@modules/Products/dtos/IProductResponseDTO";
import { IProductsRepository } from "@modules/Products/repositories/IProductsRepository";
import { inject, injectable } from "tsyringe";
import { IRequestListProducts } from "./IRequestListProductsDTO";



@injectable()
class ListProductsUseCase {

    constructor(
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("FileRepository")
        private fileRepository: IFileRepository
    ) {

    }

    async execute({ search_query, available, vendor_name, price_range, order_by, limit, offset }: IRequestListProducts): Promise<IProductResponse[]> {

        let products = await this.productsRepository.find({
            search_query,
            available,
            vendor_name,
            price_range,
            order_by,
            limit,
            offset
        })

        return await Promise.all(products.map(async (product) => {

            let files = await this.fileRepository.getFileUrlByIdOrProductId({ product_id: product.id }) as File[]

            let filesUrl = files.map(file => {

                return FileMap.return_URL(file)

            })

            product = Object.assign(product, {
                files: filesUrl
            })

            return product

        })) as IProductResponse[]





    }

}

export { ListProductsUseCase }