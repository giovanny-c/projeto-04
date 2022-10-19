import { Router } from "express"
import { celebrate, Joi, Segments } from "celebrate" // @types/joi tbm
import { ensureAuthenticated } from "@shared/middlewares/ensureAuthenticated"
import { SaveOrderController } from "@modules/Orders/useCases/createOrder/SaveOrderController"
import { ShowOrderController } from "@modules/Orders/useCases/showOrder/ShowOrderController"
import { ShowCustomersOrdersController } from "@modules/Orders/useCases/showCustomersOrders/ShowCustomerOrdersController"
import { CancelOrderController } from "@modules/Orders/useCases/cancelOrder/CancelOrderController"
import { PayOrderController } from "@modules/Orders/useCases/payOrder/PayOrderController"




const ordersRoutes = Router()


ordersRoutes.use(ensureAuthenticated)

const saveOrderController = new SaveOrderController()
const showOrderController = new ShowOrderController()
const showCustomersOrdersController = new ShowCustomersOrdersController()
const cancelOrderController = new CancelOrderController()
const payOrderController = new PayOrderController()

ordersRoutes.post(
    "/create",
    // celebrate({
    //     [Segments.BODY]: {
    //         products: Joi.required(),
    //     },
    // }),
    saveOrderController.handle,
)



ordersRoutes.get(
    "/user",
    showCustomersOrdersController.handle,
)




ordersRoutes.get(
    "/:id",
    celebrate({
        //middleware
        [Segments.PARAMS]: {
            // do req.params
            id: Joi.string().uuid().required(), // id do tipo string(uuid), obrigatorio
        },
    }),
    showOrderController.handle,
)

ordersRoutes.put(
    "/:order_id/cancel",
    celebrate({
        [Segments.PARAMS]: {
            order_id: Joi.string().uuid().required(),
        },
    }),
    cancelOrderController.handle,
)

ordersRoutes.put(
    "/:order_id/confirm-payment",
    celebrate({
        [Segments.PARAMS]: {
            order_id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            payment_validation: Joi.boolean().required()
        }
    }),
    payOrderController.handle,
)

export default ordersRoutes
