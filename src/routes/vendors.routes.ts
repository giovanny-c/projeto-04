
import Router from "express";



//middlewares
import { ensureAuthenticated } from "../shared/middlewares/ensureAuthenticated";
import { ensureAdmin } from "@shared/middlewares/ensureAdmin";
import multer from "multer"

import uploadConfig from "@config/upload"
import { ListVendorOrdersController } from "@modules/Accounts/useCases/ListVendorOrders/ListVendorOrderController";
import { ShowVendorOrderController } from "@modules/Accounts/useCases/showVendorOrder/ShowVendorOrderController";
import { celebrate, Segments } from "celebrate";
import Joi from "joi";

const upload = multer(uploadConfig)

const vendorRoutes = Router()

const listVendorOrdersController = new ListVendorOrdersController()
const showVendorOrderController = new ShowVendorOrderController()

vendorRoutes.get("/orders", ensureAuthenticated, listVendorOrdersController.handle)
vendorRoutes.get("/order/:order_id", celebrate({
    [Segments.PARAMS]: {
        order_id: Joi.string().uuid().required()
    }
}) ,ensureAuthenticated, showVendorOrderController.handle)


export default vendorRoutes