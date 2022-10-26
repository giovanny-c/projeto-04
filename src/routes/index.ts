

import {Router} from "express"
import  accountRoutes  from "routes/accounts.routes"
import  fileRoutes  from "routes/files.routes"
import  productRoutes  from "routes/products.routes"
import  categoriesRoutes  from "routes/categories.routes"
import ordersRoutes from "routes/orders.routes"
import cartRoutes from "routes/cart.routes"
import vendorRoutes from "./vendors.routes"

import transactionRoutes from "./payment.routes"

const router = Router()

router.use("/accounts", accountRoutes)
router.use("/file", fileRoutes)
router.use(productRoutes)
router.use(categoriesRoutes)
router.use("/orders", ordersRoutes)
router.use("/cart", cartRoutes)
router.use("/vendor", vendorRoutes)
router.use("/transaction", transactionRoutes)


export default router


