
import Router from "express"

import multer from "multer"
import uploadConfig from "@config/upload"
import { ensureAuthenticated } from "@shared/middlewares/ensureAuthenticated"
import { AddToCartController } from "@modules/Cart/useCases/addToCart/AddToCartController"
import { RemoveFromCartController } from "@modules/Cart/removeFromCart/RemoveFromCartController"
import { GetCartController } from "@modules/Cart/getCart/GetCartController"



const upload = multer(uploadConfig)

const addToCartController = new AddToCartController()
const removeFromCartController = new RemoveFromCartController()
const getCartController = new GetCartController()

const cartRoutes = Router()


cartRoutes.get("/", ensureAuthenticated, getCartController.handle)
cartRoutes.put("/add", ensureAuthenticated,  addToCartController.handle)
cartRoutes.put("/remove", ensureAuthenticated, removeFromCartController.handle)


export default cartRoutes