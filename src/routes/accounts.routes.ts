
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
import { GetFileFromUserController } from "@modules/File/useCases/getFilesFromUser/GetFileFromUserController";
import { GetFileController } from "@modules/File/useCases/getFile/GetFileController";
import { SaveProductController } from "@modules/Products/useCases/saveProduct/SaveProductController";

//middlewares
import { ensureAuthenticated } from "../shared/middlewares/ensureAuthenticated";
import { ensureAdmin } from "@shared/middlewares/ensureAdmin";
import multer from "multer"

import uploadConfig from "@config/upload"
import { DeleteProductController } from "@modules/Products/useCases/deleteProduct/DeleteProductController";
import { AddAddressController } from "@modules/Accounts/useCases/addAddress/AddAddressController";
import { GetAddressController } from "@modules/Accounts/useCases/getAddress/GetAddressController";

const upload = multer(uploadConfig)

const accountsRoutes = Router()

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
const saveProductController = new SaveProductController()
const deleteProductController = new DeleteProductController()
const addAddressController = new AddAddressController()
const getAddressController = new GetAddressController()

accountsRoutes.post("/sign-in", upload.none(), createUserController.handle)
accountsRoutes.get("/sign-in", signInController.handle)
accountsRoutes.patch("/confirmation", confirmateRegisterController.handle)
//se der problema com sendMail pode ser por causa do // baseUrl: (no tsconfig)
accountsRoutes.post("/log-in", upload.none(), authenticateUserController.handle)
accountsRoutes.post("/refresh-token", upload.none(), refreshTokenController.handle)
accountsRoutes.get("/profile", ensureAuthenticated, getProfileController.handle)
accountsRoutes.patch("/log-out", ensureAuthenticated, logOutController.handle)
accountsRoutes.post("/forgot-password", upload.none(), sendForgotPasswordMailController.handle)
accountsRoutes.put("/retrieve-password", upload.none(), retrievePasswordController.handle)
//accountsRoutes.post("/gen-pdf", ensureAuthenticated, upload.none(), generatePdfController.handle)

//admin // testar
accountsRoutes.post("admin/create-admin-account", ensureAuthenticated, ensureAdmin, upload.none(), createUserController.handle)

//files
accountsRoutes.get("/user/files", ensureAuthenticated, getFileFromUserController.handle)
accountsRoutes.get("/user/file/:id", ensureAuthenticated, getFileController.handle)


//products
accountsRoutes.post(["/user/products/create", "user/announce/new-product"], ensureAuthenticated, upload.array("images"), saveProductController.handle)
accountsRoutes.put("/user/product/:id/edit", ensureAuthenticated, upload.array("images"), saveProductController.handle)
accountsRoutes.delete("/user/products/:id/delete", ensureAuthenticated, deleteProductController.handle)

//address
accountsRoutes.post("/address/add", ensureAuthenticated, addAddressController.handle)
accountsRoutes.post("/address/get", ensureAuthenticated, getAddressController.handle)


export default accountsRoutes