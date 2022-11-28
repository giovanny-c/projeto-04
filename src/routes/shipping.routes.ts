
import Router from "express";



//middlewares
import { ensureAuthenticated } from "../shared/middlewares/ensureAuthenticated";

import multer from "multer"

import uploadConfig from "@config/upload"

import { ConsultingPriceAndDeliveryTimeController } from "@modules/Shipping/useCases/consultingPriceAndDeliveryTime/consultingPriceAndDeliveryTimeController";

const upload = multer(uploadConfig)

const shippingRoutes = Router()

const consultingPriceAndDeliveryTimeController = new ConsultingPriceAndDeliveryTimeController()

shippingRoutes.get("/consult", ensureAuthenticated, consultingPriceAndDeliveryTimeController.handle)


export default shippingRoutes