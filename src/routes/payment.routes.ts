import { Router } from "express"
import { celebrate, Joi, Segments } from "celebrate" // @types/joi tbm
import { ensureAuthenticated } from "@shared/middlewares/ensureAuthenticated"
import { ProcessPaymentController } from "@modules/Payment/useCases/processPayment/ProcessPaymentController"


const paymentRoutes = Router()


paymentRoutes.use(ensureAuthenticated)

const processPaymentController = new ProcessPaymentController()


paymentRoutes.post("/process" , processPaymentController.handle)



export default paymentRoutes
