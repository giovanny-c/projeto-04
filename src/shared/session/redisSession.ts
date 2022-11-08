import { redisClient, RedisStore } from "@shared/redis/redisConfig";

const redisSession = {
    store: new RedisStore({ client: redisClient as any }),
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,

    cookie: {           //habilitar em produçao
        secure: false, //true: so transmite o cookie via https
        httpOnly: false, //true: nao deixa o cookie ser lido por client-side js
        maxAge: 1000 * 60 * 60 * 24 * 7 * 30,  //1 mes
        
    }
}



export { redisSession}