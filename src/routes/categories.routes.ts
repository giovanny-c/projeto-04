
import Router from "express"

import multer from "multer"
import uploadConfig from "@config/upload"
import { ensureAdmin } from "@shared/middlewares/ensureAdmin"
import { ensureAuthenticated } from "@shared/middlewares/ensureAuthenticated"
import { SaveCategoryController } from "@modules/Categories/useCases/saveCategory/SaveCategoryController"
import { DeleteCategoryController } from "@modules/Categories/useCases/deleteCategory/DeleteCategoryController"


const upload = multer(uploadConfig)

const saveCategoryController = new SaveCategoryController()
const deleteCategoryController = new DeleteCategoryController()

const categoriesRoutes = Router()


categoriesRoutes.post("categories/create", ensureAuthenticated, ensureAdmin, saveCategoryController.handle)
categoriesRoutes.put("categories/edit", ensureAuthenticated, ensureAdmin, saveCategoryController.handle)
categoriesRoutes.delete("categories/create", ensureAuthenticated, ensureAdmin, deleteCategoryController.handle)

export default categoriesRoutes