import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetAddressUseCase } from "./GetAddressUseCase";

class GetAddressController {

    async handle(req: Request, res: Response): Promise<Response> {
        try {

            const {address_id} = req.body

            const {id: user_id} = req.user

            const addAddress = container.resolve(GetAddressUseCase)

            const response = await addAddress.execute(
                address_id,
                user_id
            )

            return res.json(response)


        } catch (error) {
            throw error
        }
    }

}

export { GetAddressController }