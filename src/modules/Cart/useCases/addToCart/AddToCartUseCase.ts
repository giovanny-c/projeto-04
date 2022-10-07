import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";
import ICart from "@modules/Cart/dtos/ICartDTO";
import { IProductsRepository } from "@modules/Products/repositories/IProductsRepository";
import { addInCart, getCart } from "@shared/cache/redisCache";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import {v4 as uuidV4, validate} from "uuid"

@injectable()
class AddToCartUseCase {

    constructor(
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
    ) {

    }

    async execute<T>(product_id: string, user_id?: string): Promise<T> {
//vai por o cart no redis 
//e o save order vai pegar
// depois de fazer o pedido o save order vai deletar o carrinho do redis

        const productExists = await this.productsRepository.findById(product_id)

        if(!productExists){
            throw new AppError("Product missing", 400)
        }

        const userExists = await this.usersRepository.findById(user_id as string)

        if(!userExists){

            user_id = uuidV4()
        }

        

        await addInCart(product_id, user_id as string)

          
        const cart = await getCart(user_id as string) as []

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

export {AddToCartUseCase}