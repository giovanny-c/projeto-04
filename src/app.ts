import "reflect-metadata"
import express from "express"
import cors from "cors"
import "express-async-errors"

import session from "express-session"
// import { auth, requiresAuth } from "express-openid-connect"

//db e containers e redis
import "./database"
import "@shared/container"
import "./shared/redis/redisConnect"
import { redisClient } from "./shared/redis/redisConfig"
import { RedisStore } from "@shared/session/redisSession"



//multer upload 
import upload from "@config/upload"

import { errorHandler } from "@shared/errors/ErrorHandler" //colocar em cima?

//routes
import { accountRoutes } from "./routes/account.routes"
import { fileRoutes } from "routes/file.routes"
import { productRoutes } from "routes/product.routes"
import { categoriesRoutes } from "routes/categories.routes"
import ordersRoutes from "routes/orders.routes"
//import { config } from "../src/config/auth"


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))//front

app.use(["/accounts/user/file/:id", "/accounts/user/files"], express.static(`${upload.tmpFolder}/**/**`))
//toda vez que uma rota /file for chamada
//vai acessar a pasta tmp/


// session config com redis
//user o import redisSession no lugar desse pra ver se funciona
app.use(session({
    store: new RedisStore({ client: redisClient as any }),
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,

    cookie: {           //habilitar em produçao
        secure: false, //true: so transmite o cookie via https
        httpOnly: false, //true: nao deixa o cookie ser lido por client-side js
        maxAge: 1000 * 60 * 60 * 24 * 7 * 30,  //1 mes

    }
}))





// app.use(auth(config)) 

app.use("/accounts", accountRoutes)
app.use("/file", fileRoutes)
app.use(productRoutes)
app.use(categoriesRoutes)
app.use("/orders", ordersRoutes)


app.use(errorHandler)//middleware de errors


export { app }