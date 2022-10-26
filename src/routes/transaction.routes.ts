import { Router } from "express"
import { celebrate, Joi, Segments, } from "celebrate" // @types/joi tbm
import { ensureAuthenticated } from "@shared/middlewares/ensureAuthenticated"
import { TransactionController } from "@modules/Transactions/useCases/processPayment/TransactionController"
import validator from "cpf-cnpj-validator"
import { JoinColumn, MinKey } from "typeorm"




const transactionRoutes = Router()


transactionRoutes.use(ensureAuthenticated)

const transactionController = new TransactionController()


transactionRoutes.post("/create" , ensureAuthenticated,
    celebrate({ // trocar pelo yup
        [Segments.BODY]: {
            order_id: Joi.string().uuid().required(),
            payment_type: Joi.string().allow(
                "billet",
                "credit_cart",
                "pix",
                "other").required(), //permite só esses valores
            installments: Joi.number().min(1)
            .when("payment_type", 
            {
                is: "billet", 
                then: Joi.number().max(1), 
                otherwise: Joi.number().max(12)
            }).required(), // if payment type = billet , instalments max = 1 else max = 12 
            customer_document: Joi.string().min(11).max(14).pattern(/^[0-9]+$/).required(),
            customer_email: Joi.string().email().required(), 
            customer_mobile: Joi.string().min(9).max(11).pattern(/^[0-9]+$/).required(), //max 12 char com numero apenas
            customer_name: Joi.string().min(3).required(),//min characters
            billing_address: Joi.string().required(),
            billing_city: Joi.string().required(), 
            billing_neighborhood: Joi.string(),
            billing_number: Joi.string().required(),
            billing_state: Joi.string().required(), 
            billing_zipcode: Joi.string().pattern(/^[0-9]+$/).required(),
            card_number: Joi
                .when("payment_type", {
                    is: "credit_card",
                    then: Joi.string().length(16).pattern(/^[0-9]+$/).required(),
                    otherwise: Joi.string()
                }),
            card_expiration: Joi
                .when("payment_type", {
                    is: "credit_card",
                    then: Joi.string().length(5).pattern(/^([0-9]{2})\/([0-9]{2})$/).required(), // permite só 00/00
                    otherwise: Joi.string()
            }),
            card_holderName: Joi
                .when("payment_type", {
                    is: "credit_card",
                    then: Joi.string().min(3).required(), // permite só 00/00
                    otherwise: Joi.string()
            }),
            card_cvv: Joi
                .when("payment_type", {
                    is: "credit_card",
                    then: Joi.string().length(3).pattern(/^[0-9]+$/).required(), // permite só 00/00
                    otherwise: Joi.string()
            }),
            
        }
    })
    
, transactionController.handle)



export default transactionRoutes
