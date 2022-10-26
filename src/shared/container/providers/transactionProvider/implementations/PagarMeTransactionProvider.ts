

class PagarMeTransactionProvider  {

    async proccess({
        transaction_code,
        total,
        payment_type,
        installments, 
        card,
        customer,
        billing,
        items,

    }){

        const billetParams = {
            payment_method: "boleto", // pagarme trabalha com credit_card ou boleto
            amount: total * 100, //pagarme trabalha com centavos
            installments: 1,
        }

        const credit_cardParams = {
            payment_method: "credit_card",
            amount: total * 100,
            installments,
            card_number: card.number.replace(/[^?0-9]/g, ""),// substitui tudo oque nao for numero por vazio "1234.1233..." => "12341234..."
            card_expiration_date: card.expiration.replace(/[^?0-9]/g, ""), // "mm/yy" => "mmyy" 
            card_cvv: card.cvv,
            capture: true // pesquisar sobre captura do cartao
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
            
            default :
                throw `Payment type: ${payment_type} not found!`
            
        }

        const transactionParams = {

        }
    }
}

export {PagarMeTransactionProvider}