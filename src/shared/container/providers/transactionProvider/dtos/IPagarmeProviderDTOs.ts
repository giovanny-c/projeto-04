import OrdersProducts from "@modules/Orders/entities/OrdersProducts";
import IBilling from "@modules/Transactions/dtos/IBillingDTO";
import ICard from "@modules/Transactions/dtos/ICardDTO";
import ICustomerForTransaction from "@modules/Transactions/dtos/ICustomerForTransactionDTO";

interface IPagarMeProviderRequest{
    transaction_code: string,
    total: number,
    payment_type: string,
    installments: number, 
    card: ICard,
    customer: ICustomerForTransaction,
    billing: IBilling,
    items: OrdersProducts[],
}


interface IPagarMeProviderResponse{
    transaction_id: string
    status: string
    billet: {
        url: string,
        barCode: string | number,
    },
    card: {
        id: string //id do cartao salvo no pagarme
        //nao é numero em si,
        //pode salvar no banco
        //ao fazer uma nova compra o cliente nao precisa digitar
        //todo o cartao dnv, usando o gateway do pagarme
    },

    processorResponse: string
}


export {IPagarMeProviderRequest, IPagarMeProviderResponse}