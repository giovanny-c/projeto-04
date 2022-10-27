import { cpf } from "cpf-cnpj-validator"
import { ITransactionProvider } from "../ITransactionProvider"
import pagarme from "pagarme"
import { TransactionStatus } from "@modules/Transactions/types/TransactionStatus"
import { IPagarMeProviderRequest, IPagarMeProviderResponse } from "../dtos/IPagarmeProviderDTOs"

class PagarMeTransactionProvider implements ITransactionProvider {

    async proccess({
        transaction_code,
        total,
        payment_type,
        installments,
        card,
        customer,
        billing,
        items, //itens do order products

    }: IPagarMeProviderRequest): Promise<IPagarMeProviderResponse> {

        const billetParams = {
            payment_method: "boleto", // pagarme trabalha com credit_card ou boleto
            amount: total * 100, //pagarme trabalha com centavos
            installments: 1,
        }

        const credit_cardParams = {
            payment_method: "credit_card",
            amount: total * 100,
            installments,
            card_holder_name: card.holder_name,
            card_number: card.number.replace(/[^?0-9]/g, ""),// substitui tudo oque nao for numero por vazio "1234.1233..." => "12341234..."
            card_expiration_date: card.expiration.replace(/[^?0-9]/g, ""), // "mm/yy" => "mmyy" 
            card_cvv: card.cvv,
            capture: true // pesquisar sobre captura do cartao// nao por false
        }

        const pixParams = {}

        let paymentParams

        switch (payment_type) {
            case "credit_card":

                paymentParams = credit_cardParams
                break

            case "billet":

                paymentParams = billetParams
                break

            case "pix":

                paymentParams = pixParams
                break

            default:
                throw `Payment type: ${payment_type} not found!`

        }

        const customerParams = {
            customer: {
                external_id: customer.id,
                name: customer.name,
                email: customer.email,
                type: cpf.isValid(customer.document) ? "individual" : "corporation", // se é pf ou pj
                country: "br",
                phone_numbers: [customer.mobile],
                documents: [
                    {
                        type: cpf.isValid(customer.document) ? "cpf" : "cnpj",
                        number: customer.document.replace(/[^?0-9]/g, "")
                    }
                ]
            }
        }

        const billingParams = billing?.zipcode ? { //se existir zipcode
            billing: {
                name: "Billing Address",
                address: {
                    country: "br",
                    state: billing.state,
                    city: billing.city,
                    neighborhood: billing.neighborhood,
                    street: billing.address,
                    street_number: billing.number,
                    zipcode: billing.zipcode.replace(/[^?0-9]/g, "")
                }
            }
        } : {}


        const itemsParams = items && items.length > 0 ? {
            items: items.map((item) => ({
                id: item?.product_id, //? para nao dar exepton se nao existir
                title: item?.product.name,
                unit_price: item?.price * 100, // ver se precisa converter para number
                quantity: item.quantity || 1,
                tangible: true, //se é produto fisico ou nao
            }))
        } : {
            items: [ // se nao tiver produto, for produ digital, curso etc
                {
                    id: "1",
                    title: `t-${transaction_code}`,
                    unit_price: total * 100, // ver se precisa converter para number
                    quantity: 1,
                    tangible: false,
                },
            ],
        }

        //qualquer coisa que vc quiser colocar que vai estar disponivel
        // no campo de busca dele
        const metadataParams = {
            metadata: {
                transaction_code: transaction_code
            }
        }

        const transactionParams = {
            async: false, //false = aguarda a resposta,  se true nao espera processar o pagamento e retorna como pendente
            postback_url: process.env.PAGARME_WEBHOOK_URL, // se a transaction retornar como pending, quando for accepted, vai mandar para essa rota, (atualizar o order nessa rota)
            ...paymentParams,
            ...customerParams,
            ...billingParams,
            ...itemsParams,
            ...metadataParams
        }

        const client = await pagarme.client.connect({
            api_key: process.env.PAGARME_API_KEY as string
        })

        const response = await client.transactions.create(transactionParams)

        console.log("response:", response)

        return {
            transaction_id: response.id,
            status: this.translateStatus(response.status),
            billet: {
                url: response.boleto_url,
                barCode: response.boleto_barcode,
            },
            card: {
                id: response.card?.id //id do cartao salvo no pagarme
                //nao é numero em si,
                //pode salvar no banco
                //ao fazer uma nova compra o cliente nao precisa digitar
                //todo o cartao dnv, usando o gateway do pagarme
            },

            processorResponse: JSON.stringify(response)
        }
    }

    translateStatus(status: string): TransactionStatus { //pega o status da response do gateway e 
        //transforma ele em status do app para transactions

        const statusMap = {
            processing: "processing", 
            waiting_payment: "pending",
            authorized: "pending",
            paid: "approved",
            refused: "refused ",
            chargedback: "chargeback"
        }
        

          return statusMap[status]
          //vai retornar o valor do propriedade de statusMap em que a propriedade corresponder
          // ao valor do parametro status
    } 
}

export { PagarMeTransactionProvider }