import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";
import { IProductsRepository } from "@modules/Products/repositories/IProductsRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class AddToCartUseCase {

    constructor(
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
    ) {

    }

    async execute(product_id: string, user_id: string): Promise<void> {

//vai por o cart no redis 
//e o save order vai pegar
// depois de fazer o pedido o save order vai deletar o carrinho do redis

    }
}

export {
    AddToCartUseCase
}