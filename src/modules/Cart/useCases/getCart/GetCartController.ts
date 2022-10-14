import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetCartUseCase } from "./GetCartUseCase";


class GetCartController {


    async handle(req: Request, res: Response): Promise<Response>{

        const {id: user_id} = req.user

        //pegar o user que tem cart mas nao esta logado

        const GetCart = container.resolve(GetCartUseCase)

        const cart = await GetCart.execute(user_id)

        return res.json(cart)
        
        //return res.redirect(`/cart/user/${cart_id}`)
        
        
        //pegar o cart no order
        //ver se funciona o redirect e redirect back(pagina anterior)
        
    }

}

export {GetCartController}