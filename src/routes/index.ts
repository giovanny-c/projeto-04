

import {Router} from "express"
import  accountRoutes  from "routes/accounts.routes"
import  fileRoutes  from "routes/files.routes"
import  productRoutes  from "routes/products.routes"
import  categoriesRoutes  from "routes/categories.routes"
import ordersRoutes from "routes/orders.routes"

const router = Router()

router.use("/accounts", accountRoutes)
router.use("/file", fileRoutes)
router.use(productRoutes)
router.use(categoriesRoutes)
router.use("/orders", ordersRoutes)

export default router


