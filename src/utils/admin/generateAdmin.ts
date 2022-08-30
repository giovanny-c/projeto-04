
import { UsersRepository } from "@modules/Accounts/repositories/implementations/UsersRepository";
import { genPassword } from "@utils/passwordUtils/passwordUtils";

// GENERATES AN ADMIN ACC
const usersRepository = new UsersRepository()

const password = "admin"
const { salt, hash } = genPassword(password)



usersRepository.save({
    name: "admin",
    email: "admin@email.com",
    password_hash: hash,
    salt,
    admin: true,
    is_confirmed: true,
})
// achar outro 