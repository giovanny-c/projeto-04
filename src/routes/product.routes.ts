
import Router from "express"

import multer from "multer"
import uploadConfig from "@config/upload"
import { GetProductController } from "@modules/Products/useCases/getProduct/GetProductController"



const upload = multer(uploadConfig)

const productRoutes = Router()

const getProductController = new GetProductController()

productRoutes.get("/product/:product_id", getProductController.handle)

export { productRoutes }