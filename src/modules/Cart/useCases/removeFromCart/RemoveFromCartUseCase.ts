import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";
import ICart from "@modules/Cart/dtos/ICartDTO";
import { IProductsRepository } from "@modules/Products/repositories/IProductsRepository";
import ICacheProvider from "@shared/container/providers/cacheProvider/ICacheProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import {v4 as uuidV4} from "uuid"
import {validate} from "uuid"








@injectable()
class RemoveFromCartUseCase {

    constructor(
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("CacheProvider")
        private cacheProvider: ICacheProvider,
    ) {

    }

    async execute<T>(user_id: string, product_id: string, quantity?: boolean): Promise<T | void> {
//vai por o cart no redis 
//e o save order vai pegar
// depois de fazer o pedido o save order vai deletar o carrinho do redis

        const productExists = await this.productsRepository.findById(product_id)

        if(!productExists){
            throw new AppError("Product missing", 400)
        }

        const userExists = await this.usersRepository.findById(user_id)

        if(!userExists){

            user_id = uuidV4()
        }

        
        if(quantity){

            await this.cacheProvider.decreaseInCart(product_id, user_id)
        }
        if(!quantity){

            await this.cacheProvider.delInCart(product_id, user_id)
        }
        

        let cart = await this.cacheProvider.getCart(user_id) as []

        if(cart){

            const products = cart.filter(value => validate(value))
            const quantities = cart.filter(value => !validate(value))

        let res: ICart[] = [] 

        for (let index = 0; index < products.length; index++) {
            
            
            res.push({
                product_id: products[index],
                quantity: Number(quantities[index])
            })
        }
        
        
            return res as T
        }

    }
}

export {RemoveFromCartUseCase}