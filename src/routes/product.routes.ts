
import Router from "express"

import multer from "multer"
import uploadConfig from "@config/upload"
import { GetProductController } from "@modules/Products/useCases/getProduct/GetProductController"
import { ListProductsController } from "@modules/Products/useCases/listProducts/ListProductsController"



const upload = multer(uploadConfig)

const productRoutes = Router()

const getProductController = new GetProductController()
const listProductsController = new ListProductsController()


productRoutes.get("/product/:product_id", getProductController.handle)
productRoutes.get("/products", listProductsController.handle)

export { productRoutes }