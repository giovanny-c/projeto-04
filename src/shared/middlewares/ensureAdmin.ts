import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";


export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {

    if (!req.user.admin) {
        throw new AppError("Page not found(Forbidden admin only)", 404)// como 404 para o client nao saber que existe
    }

    next()
}