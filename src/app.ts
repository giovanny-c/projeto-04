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
import { redisClient, RedisStore } from "./shared/redis/redisConfig"




//multer upload 
import upload from "@config/upload"

import { errorHandler } from "@shared/errors/ErrorHandler" //colocar em cima?

//routes
import router from "./routes"
import { redisSession } from "@shared/session/redisSession"
import { AppError } from "@shared/errors/AppError"

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
app.use(session(redisSession))
app.use(function(req, res, next) {
    if(!req.session){
        return next( new AppError("Redis down!"))
    }
    next()
})




// app.use(auth(config)) 

app.use(router)



app.use(errorHandler)//middleware de errors


export { app }