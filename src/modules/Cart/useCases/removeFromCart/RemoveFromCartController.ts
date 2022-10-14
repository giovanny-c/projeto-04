import { privateDecrypt } from "crypto";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveFromCartUseCase } from "./RemoveFromCartUseCase";


class RemoveFromCartController {


    async handle(req: Request, res: Response): Promise<Response>{

        const {id: user_id} = req.user

        const {product_id, quantity} = req.body

        const removeFromCart = container.resolve(RemoveFromCartUseCase)

        const cart = await removeFromCart.execute(user_id, product_id, quantity)

        return res.json(cart)
        
        //return res.redirect(`/cart/user/${cart_id}`)
        
        //tirar produto do cart
        //pegar o cart no order
        //ver se funciona o redirect e redirect back(pagina anterior)
        
    }

}

export {RemoveFromCartController}