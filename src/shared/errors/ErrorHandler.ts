
import { AxiosError } from "axios";
import { NextFunction, Request, Response } from "express"
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { AppError } from "./AppError"





export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {

    if (err instanceof AppError) {
        //com AppError
        //sem set status?
        console.error(err)
        return res.status(err.statusCode).json({ status: err.statusCode, message: err.message })

    }

    if (err instanceof TokenExpiredError) { //se o token tiver expirado
        console.error(err)
        return res.status(401).send({ message: err.message })

    }

    if (err instanceof JsonWebTokenError) { //se for outro erro relacionado ao token
        console.error(err)
        return res.status(401).send({ message: err.message })
    }

    if (err instanceof AxiosError) {

        if (err.response) {
            console.error(err)
            return res.status(err.response.data.status | 400).send({ message: err.response.data.message })
        }
        console.error(err)
        return res.status(500).send({ message: err.message })

    }

    console.error(err)
    return res.status(500).json({

        status: "error",
        message: `Internal server error - ${err}`
    })
}