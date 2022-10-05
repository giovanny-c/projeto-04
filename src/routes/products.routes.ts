
import Router from "express"

import multer from "multer"
import uploadConfig from "@config/upload"
import { GetProductController } from "@modules/Products/useCases/getProduct/GetProductController"
import { ListProductsController } from "@modules/Products/useCases/listProducts/ListProductsController"



const upload = multer(uploadConfig)

const productsRoutes = Router()

const getProductController = new GetProductController()
const listProductsController = new ListProductsController()


productsRoutes.get("/product/:product_id", getProductController.handle)
productsRoutes.get("/products", listProductsController.handle)

export default productsRoutes