import { container } from "tsyringe";

import "./providers/index"

import { UsersRepository } from "../../modules/Accounts/repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../modules/Accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../modules/Accounts/repositories/IUsersTokensRepository";
import { UsersTokensRepository } from "../../modules/Accounts/repositories/implementations/UsersTokensRepository";
import { IFileRepository } from "@modules/File/repositories/IFileRepository";
import { FileRepository } from "@modules/File/repositories/implementations/FileRepository";


container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
)

container.registerSingleton<IUsersTokensRepository>(
    "UsersTokensRepository",
    UsersTokensRepository
)

container.registerSingleton<IFileRepository>(
    "FileRepository",
    FileRepository
)