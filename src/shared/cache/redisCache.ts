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

function delRedis(key: string){
    const syncRedisSet = promisify(redisClient.del).bind(redisClient)
    return syncRedisSet(key)
}


function addInCart<T>(item_id: string, user_id: string): T | undefined{

    const getItem = promisify(redisClient.hGet).bind(redisClient)

    const itemExists = getItem(`basket: ${user_id}`, item_id)

    
    if(!itemExists){

        
        const setItem =  promisify(redisClient.hSet).bind(redisClient)

        return setItem(`basket: ${user_id}`, item_id)
    }

    if(itemExists){
        const increaseItem = promisify(redisClient.hIncrBy).bind(redisClient)
        
        return increaseItem(`basket: ${user_id}`, item_id, 1)
    }
}

function getAllInCart<T>(user_id: string): T | undefined{

    const getAll = promisify(redisClient.hGetAll).bind(redisClient)
    
    return getAll(`basket: ${user_id}`)
}

function delAllInCart<T>(item_id: string, user_id: string): T | undefined{

    const delCart = promisify(redisClient.hDel).bind(redisClient)
    
    return delCart(`basket: ${user_id}`, item_id)
}

function delInCart<T>(item_id: string, user_id: string): T | undefined{


    const getItem = promisify(redisClient.hGet).bind(redisClient)

    const itemExists = getItem(`basket: ${user_id}`, item_id)
  
    if(!itemExists){

        
        return undefined
    }

    if(itemExists){
        
        const delInCart = promisify(redisClient.hIncrBy).bind(redisClient)
        
        return delInCart(`basket: ${user_id}`, item_id, -1)
    }

}

export {getRedis, setRedis, delRedis, addInCart, getAllInCart, delAllInCart, delInCart}