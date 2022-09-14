import session from "express-session"
import * as redis from "redis"
import connectRedis from "connect-redis"
import { promisify } from "util"

//redis e session config
const RedisStore = connectRedis(session)

//config redis client
const redisClient = redis.createClient({
    legacyMode: true,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    },

})

function getRedis(value: string) { //transforma a func get do redis em async
    const syncRedisGet = promisify(redisClient.get).bind(redisClient)
    return syncRedisGet(value)
}

function setRedis(key: string, value: string) {
    const syncRedisSet = promisify(redisClient.set).bind(redisClient)
    return syncRedisSet(key, value)
}


export { RedisStore, redisClient, getRedis, setRedis }