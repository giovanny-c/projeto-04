import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";
import { IProductsRepository } from "@modules/Products/repositories/IProductsRepository";
import {  getCart } from "@shared/cache/redisCache";
import { AppError } from "@shared/errors/AppError";

import { inject, injectable } from "tsyringe";
import {validate} from "uuid"
import ICart from "../dtos/ICartDTO";



@injectable()
class GetCartUseCase {

    constructor(
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
    ) {

    }

    async execute<T>(user_id: string): Promise<T> {
//vai por o cart no redis 
//e o save order vai pegar
// depois de fazer o pedido o save order vai deletar o carrinho do redis

        const userExists = await this.usersRepository.findById(user_id as string)

        if(!userExists){

            throw new AppError("User not found!", 400)
        }
          
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

export {GetCartUseCase}