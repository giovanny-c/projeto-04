import { Request, Response } from "express";
import { container } from "tsyringe";
import { AddAddressUseCase } from "./AddAddressUseCase";

class AddAddressController {

    async handle(req: Request, res: Response): Promise<Response> {
        try {

            const {
                address_id,
                address,
                address_number,
                neighborhood,
                city,
                state,
                country,
                zipcode,
                default_address} = req.body

            const {id: user_id} = req.user

            const addAddress = container.resolve(AddAddressUseCase)

            const response = await addAddress.execute({
                id: address_id,
                address,
                address_number,
                neighborhood,
                city,
                state,
                country,
                zipcode,
                default_address,
                user_id
            })

            return res.json(response)


        } catch (error) {
            throw error
        }
    }

}

export { AddAddressController }