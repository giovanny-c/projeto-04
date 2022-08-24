
import Router from "express";

import { CreateUserController } from "../modules/Accounts/useCases/createUser/CreateUserController";
import { SignInController } from "../modules/Accounts/useCases/signIn/SignInController";
import { ConfirmateRegisterController } from "../modules/Accounts/useCases/confirmateRegister/ConfirmateRegisterController"
import { AuthenticateUserController } from "../modules/Accounts/useCases/authenticateUser/AuthenticateUserController";
import { GetProfileController } from "../modules/Accounts/useCases/getProfile/GetProfileController";
import { RefreshTokenController } from "../modules/Accounts/useCases/refreshToken/RefreshTokenController";
import { LogOutController } from "../modules/Accounts/useCases/logout/LogOutController";
import { SendForgotPasswordMailController } from "../modules/Accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { RetrievePasswordController } from "../modules/Accounts/useCases/retrivePassword/RetrievePasswordController";
import { GeneratePdfController } from "../modules/Accounts/useCases/generatePdf/GeneratePdfController";
//middlewares
import { ensureAuthenticated } from "../shared/middlewares/ensureAuthenticated";
import multer from "multer"
import { GetFileFromUserController } from "@modules/File/useCases/getFilesFromUser/GetFileFromUserController";
import { GetFileController } from "@modules/File/useCases/getFile/GetFileController";
import { ensureAdmin } from "@shared/middlewares/ensureAdmin";

const upload = multer()

const accountRoutes = Router()

const createUserController = new CreateUserController()
const signInController = new SignInController()
const confirmateRegisterController = new ConfirmateRegisterController()
const authenticateUserController = new AuthenticateUserController()
const getProfileController = new GetProfileController()
const refreshTokenController = new RefreshTokenController()
const logOutController = new LogOutController()
const sendForgotPasswordMailController = new SendForgotPasswordMailController()
const retrievePasswordController = new RetrievePasswordController()
const generatePdfController = new GeneratePdfController()
const getFileController = new GetFileController()
const getFileFromUserController = new GetFileFromUserController()

accountRoutes.post("/sign-in", upload.none(), createUserController.handle)
accountRoutes.get("/sign-in", signInController.handle)
accountRoutes.patch("/confirmation", confirmateRegisterController.handle)
//se der problema com sendMail pode ser por causa do // baseUrl: (no tsconfig)
accountRoutes.patch("/log-in", upload.none(), authenticateUserController.handle)
accountRoutes.post("/refresh-token", upload.none(), refreshTokenController.handle)
accountRoutes.get("/profile", ensureAuthenticated, getProfileController.handle)
accountRoutes.patch("/log-out", ensureAuthenticated, logOutController.handle)
accountRoutes.post("/forgot-password", upload.none(), sendForgotPasswordMailController.handle)
accountRoutes.put("/retrieve-password", upload.none(), retrievePasswordController.handle)
accountRoutes.post("/gen-pdf", ensureAuthenticated, upload.none(), generatePdfController.handle)
accountRoutes.get("/user/files", ensureAuthenticated, getFileFromUserController.handle)

//admin // testar
accountRoutes.post("admin/create-admin-account", ensureAuthenticated, ensureAdmin, upload.none(), createUserController.handle)

accountRoutes.get("/user/file/:id", ensureAuthenticated, getFileController.handle)




export { accountRoutes }