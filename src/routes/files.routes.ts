import { Router } from "express"

import multer from "multer"
import uploadConfig from "@config/upload"

import { ensureAuthenticated } from "@shared/middlewares/ensureAuthenticated"
import { SaveFileController } from "@modules/File/useCases/saveFile/SaveFileController"
import { DeleteFileController } from "@modules/File/useCases/deleteFile/DeleteFileController"


const filesRoutes = Router()

const upload = multer(uploadConfig)

const saveFileController = new SaveFileController()
const deleteFileController = new DeleteFileController()

filesRoutes.post("/save", ensureAuthenticated, upload.single("file"), saveFileController.handle)
filesRoutes.delete("/delete", ensureAuthenticated, upload.none(), deleteFileController.handle)


export default filesRoutes