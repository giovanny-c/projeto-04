
import Router from "express"

import multer from "multer"
import uploadConfig from "@config/upload"


const upload = multer(uploadConfig)

const categoriesRoutes = Router()


categoriesRoutes.post("")
categoriesRoutes.put("")
categoriesRoutes.delete("")

export { categoriesRoutes }