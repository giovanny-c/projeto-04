
import Router from "express"

import multer from "multer"
import uploadConfig from "@config/upload"
import { ensureAuthenticated } from "@shared/middlewares/ensureAuthenticated"
import { AddToCartController } from "@modules/Cart/useCases/addToCart/AddToCartController"



const upload = multer(uploadConfig)

const addToCartController = new AddToCartController()

const cartRoutes = Router()


cartRoutes.post("/add", ensureAuthenticated,  addToCartController.handle)

export default cartRoutes