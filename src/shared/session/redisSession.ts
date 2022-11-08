import { redisClient } from "@shared/redis/redisConfig";
import session from "express-session"
import connectRedis from "connect-redis"

let RedisStore = connectRedis(session)
const redisSession = {
    secret: process.env.SESSION_SECRET as string,
    store: new RedisStore({client: redisClient as any}),
    resave: false,
    saveUninitialized: true,    
    cookie: {       
            //habilitar em produçao
        maxAge: 1000 * 60 * 60 * 24 * 30,  //1 mes
        secure: false, //true: so transmite o cookie via https
        httpOnly: false, //true: nao deixa o cookie ser lido por client-side js

    },

}


export { redisSession }