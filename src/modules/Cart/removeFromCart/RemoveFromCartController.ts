import { Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveFromCartUseCase } from "./RemoveFromCartUseCase";


class RemoveFromCartController {


    async handle(req: Request, res: Response): Promise<Response>{

        const {id: user_id} = req.user

        const {product_id} = req.body

        const removeFromCart = container.resolve(RemoveFromCartUseCase)

        const cart = await removeFromCart.execute(product_id, user_id)

        return res.json(cart)
        
        //return res.redirect(`/cart/user/${cart_id}`)
        
        //tirar produto do cart
        //pegar o cart no order
        //ver se funciona o redirect e redirect back(pagina anterior)
        
    }

}

export {RemoveFromCartController}