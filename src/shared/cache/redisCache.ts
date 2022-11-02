// import { redisClient } from "@shared/redis/redisConfig"
// import { promisify } from "util"

// function getRedis(value: string) { //transforma a func get do redis em async
//     const syncRedisGet = promisify(redisClient.get).bind(redisClient)
//     return syncRedisGet(value)
// }

// function setRedis(key: string, value: string){
//     const syncRedisSet = promisify(redisClient.set).bind(redisClient)
//     return syncRedisSet(key, value)
// }

// function delRedis(key: string){
//     const syncRedisSet = promisify(redisClient.del).bind(redisClient)
//     return syncRedisSet(key)
// }


// async function addInCart<T>(item_id: string, user_id: string): Promise<T | undefined>{

//     const getItem = promisify(redisClient.hGet).bind(redisClient)

//     const itemExists = await getItem(`basket: ${user_id}`, item_id)

    
//     if(!itemExists){

        
//         const setItem =  promisify(redisClient.hSet).bind(redisClient)

//         return await setItem(`basket: ${user_id}`, item_id, 1)
//     }

//     if(itemExists){
//         const increaseItem = promisify(redisClient.hIncrBy).bind(redisClient)
        
//         return await increaseItem(`basket: ${user_id}`, item_id, 1)
//     }
// }

// async function getCart<T>(user_id: string): Promise<T | undefined>{

//     const getAll = promisify(redisClient.hGetAll).bind(redisClient)
    
//     return await getAll(`basket: ${user_id}`)
// }

// async function delInCart<T>(item_id: string, user_id: string): Promise<T | undefined>{

//     const delCart = promisify(redisClient.hDel).bind(redisClient)
    
//     return  await delCart(`basket: ${user_id}`, item_id)
// }

// async function delCart<T>(user_id: string): Promise<T | undefined>{

//     const delCart = promisify(redisClient.del).bind(redisClient)
    
//     return  await delCart(`basket: ${user_id}`)
// }

// async function decreaseInCart<T>(item_id: string, user_id: string): Promise<T | undefined>{


//     const getItem = promisify(redisClient.hGet).bind(redisClient)

//     const itemExists = await getItem(`basket: ${user_id}`, item_id)

    
  
//     if(!itemExists){

        
//         return undefined
//     }

//     if(itemExists){

//         if(itemExists <= 1){

//             const removeFromCart = promisify(redisClient.hDel).bind(redisClient)
        
//             return await removeFromCart(`basket: ${user_id}`, item_id)         
//         }
        
//         const delInCart = promisify(redisClient.hIncrBy).bind(redisClient)
        
//         return await delInCart(`basket: ${user_id}`, item_id, -1)

        

//     }



// }

// export {getRedis, setRedis, delRedis, addInCart, getCart, delCart, decreaseInCart, delInCart}