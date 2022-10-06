import { Request, Response } from "express";
import { container } from "tsyringe";
import { AddToCartUseCase } from "./AddToCartUseCase";


class AddToCartController {


    async handle(req: Request, res: Response): Promise<Response>{

        const {id: user_id} = req.user

        const {product_id} = req.body

        const addToCart = container.resolve(AddToCartUseCase)

        const cart = await addToCart.execute(product_id, user_id)

        return res.json(cart)
        
        //return res.redirect(`/cart/user/${cart_id}`)
    }
}

export {AddToCartController}