import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";
import { IProductsRepository } from "@modules/Products/repositories/IProductsRepository";
import { delCart } from "@shared/cache/redisCache";
import { AppError } from "@shared/errors/AppError";

import { inject, injectable } from "tsyringe";


interface ICart{
    product_id: string
    quantity: number
}

@injectable()
class RemoveCartUseCase {

    constructor(
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
    ) {

    }

    async execute<T>(user_id: string): Promise<T | void> {
//vai por o cart no redis 
//e o save order vai pegar
// depois de fazer o pedido o save order vai deletar o carrinho do redis

        

        const userExists = await this.usersRepository.findById(user_id as string)

        if(!userExists){

            throw new AppError("User not found!", 400)
        }

        await delCart(user_id)

    }
}

export {RemoveCartUseCase}