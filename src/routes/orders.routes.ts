import { Router } from "express"
import { celebrate, Joi, Segments } from "celebrate" // @types/joi tbm
import { ensureAuthenticated } from "@shared/middlewares/ensureAuthenticated"
import { SaveOrderController } from "@modules/orders/useCases/createOrder/SaveOrderController"
import { ShowOrderController } from "@modules/orders/useCases/showOrder/ShowOrderController"
import { ShowCustomersOrdersController } from "@modules/orders/useCases/showCustomersOrders/ShowCustomerOrdersController"




const ordersRoutes = Router()


ordersRoutes.use(ensureAuthenticated)

const saveOrderController = new SaveOrderController()
const showOrderController = new ShowOrderController()
const showCustomersOrdersController = new ShowCustomersOrdersController()

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
    "/:id/cancel",
    celebrate({
        [Segments.BODY]: {
            order_id: Joi.string().uuid().required(),
        },
    }),
    saveOrderController.handle,
)

export default ordersRoutes
