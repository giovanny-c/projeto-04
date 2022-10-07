import { Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveCartUseCase } from "./RemoveAllFromCartUseCase";


class RemoveCartController {


    async handle(req: Request, res: Response): Promise<Response>{

        const {id: user_id} = req.user

        //pegar o user que tem cart mas nao esta logado

        const delCart = container.resolve(RemoveCartUseCase)

        const cart = await delCart.execute(user_id)

        return res.json(cart)
        
        //return res.redirect(`/cart/user/${cart_id}`)
        
        
        //pegar o cart no order
        //ver se funciona o redirect e redirect back(pagina anterior)
        
    }

}

export {RemoveCartController}