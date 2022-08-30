import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";
import { IFindProducts } from "@modules/Products/dtos/IFindProductsDTO";
import { IProductsRepository } from "@modules/Products/repositories/IProductsRepository";
import { inject, injectable } from "tsyringe";



@injectable()
class ListProductsUseCase {

    constructor(
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {

    }

    async execute({ search_query, available, vendor_name, price_range, order_by, limit, offset }: IFindProducts) {

        return await this.productsRepository.find({
            search_query,
            available,
            vendor_name,
            price_range,
            order_by,
            limit,
            offset
        })

    }

}

export { ListProductsUseCase }