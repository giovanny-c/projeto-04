import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { SendConfirmationRegisterMailUseCase } from "../sendConfirmationRegisterMail/SendConfirmationRegisterMailUseCase";



class CreateUserController {

    async handle(req: Request, res: Response): Promise<Response> {
        try {



            const { name, email, password } = req.body

            const createUser = container.resolve(CreateUserUseCase)

            const sendConfirmationRegisterMail = container.resolve(SendConfirmationRegisterMailUseCase)

            // if (req.user.admin) { // so se for admin

            //     const { admin } = req.body

            //     await createUser.execute({ name, email, password, admin })
            // }

            await createUser.execute({ name, email, password })

            await sendConfirmationRegisterMail.execute(email)


            return res.status(200).json("A confirmation email was sent to the email provided. Please verify your inbox to confirm your sign-in")

        } catch (error) {
            throw error
        }
    }


}

export { CreateUserController }