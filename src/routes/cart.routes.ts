
import Router from "express"

import multer from "multer"
import uploadConfig from "@config/upload"
import { ensureAuthenticated } from "@shared/middlewares/ensureAuthenticated"
import { AddToCartController } from "@modules/Cart/useCases/addToCart/AddToCartController"
import { RemoveFromCartController } from "@modules/Cart/removeFromCart/RemoveFromCartController"



const upload = multer(uploadConfig)

const addToCartController = new AddToCartController()
const removeFromCartController = new RemoveFromCartController()

const cartRoutes = Router()


cartRoutes.put("/add", ensureAuthenticated,  addToCartController.handle)
cartRoutes.put("/remove", ensureAuthenticated, removeFromCartController.handle)

export default cartRoutes