

// import {dataSorce} from "../index" 
// const User = require("../../modules/Accounts/entities/User")
// const { genPassword } = require("../../utils/passwordUtils")
// //import { dataSource } from "database"
// //import { User } from "@modules/Accounts/entities/User"
// //import { genPassword } from "@utils/passwordUtils/passwordUtils"

// async function createAdmin() {

//     const repository = dataSource.getRepository(User)

//     const password = "123456"
//     const { hash, salt } = genPassword(password)

//     const user = repository.create({
//         name: "admin",
//         email: "admin@email.com",
//         password_hash: hash,
//         salt,
//         is_confirmed: true,
//         admin: true
//     })

//     await this.repository.save(user)

//     console.log(`Admin created, login: ${user.email}, password: ${password}`)

//     dataSource.destroy()

//     //Nao ta FUnCionado



// }