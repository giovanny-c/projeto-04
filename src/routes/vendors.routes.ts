
import Router from "express";



//middlewares
import { ensureAuthenticated } from "../shared/middlewares/ensureAuthenticated";
import { ensureAdmin } from "@shared/middlewares/ensureAdmin";
import multer from "multer"

import uploadConfig from "@config/upload"
import { ShowVendorOrdersController } from "@modules/Accounts/useCases/showVendorOrders/ShowVendorOrderController";

const upload = multer(uploadConfig)

const vendorRoutes = Router()


const showVendorOrdersController = new ShowVendorOrdersController()

vendorRoutes.get("/orders", ensureAuthenticated, showVendorOrdersController.handle)


export default vendorRoutes