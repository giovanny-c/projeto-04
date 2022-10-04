import { redisClient } from "@shared/redis/redisConfig"
import { promisify } from "util"

function getRedis(value: string) { //transforma a func get do redis em async
    const syncRedisGet = promisify(redisClient.get).bind(redisClient)
    return syncRedisGet(value)
}

function setRedis(key: string, value: string){
    const syncRedisSet = promisify(redisClient.set).bind(redisClient)
    return syncRedisSet(key, value)
}


export {getRedis, setRedis}