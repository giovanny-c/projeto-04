import "reflect-metadata"
import express from "express"
import cors from "cors"
import "express-async-errors"



// import { auth, requiresAuth } from "express-openid-connect"

//db e containers e redis
import "./database"
import "@shared/container"
import "shared/redis/redisConnect"
import session from "express-session"
import { redisSession } from "@shared/session/redisSession"

// rabbitMQ
import rabbitmq_router from "routes/rabbitMQ-router"
import RabbitMQServer from "@shared/rabbitMQ/rabbitMQ-server"

//multer upload 
import upload from "@config/upload"

//error
import { errorHandler } from "@shared/errors/ErrorHandler" //colocar em cima?

//routes
import router from "./routes"
import { AppError } from "@shared/errors/AppError"

//view engine
import nunjucks from "nunjucks"

//import { config } from "../src/config/auth"


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))//front


//views
nunjucks.configure("views", {
    autoescape: true,
    express: app
})
app.set("view engine", ".njk")
app.use(express.static("../views"))

//app.use(["/accounts/user/file/:id", "/accounts/user/files"], express.static(`${upload.tmpFolder}/**/**`))
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

app.use(rabbitmq_router)

const consumer = async() => {    
    const rabbitMQServer = new RabbitMQServer('amqp://admin:admin@rabbitmq:5672')
    await rabbitMQServer.start()
    
    await rabbitMQServer.consume("queue1", (message) => console.log(message.content.toString()))
}




app.use(errorHandler)//middleware de errors


export { app }