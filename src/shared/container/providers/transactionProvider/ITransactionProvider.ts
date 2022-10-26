import OrdersProducts from "@modules/Orders/entities/OrdersProducts";
import IBilling from "@modules/Transactions/dtos/IBillingDTO";
import ICard from "@modules/Transactions/dtos/ICardDTO";
import ICustomerForTransaction from "@modules/Transactions/dtos/ICustomerForTransactionDTO";

interface ITransactionProviderRequest{
    transaction_code: string,
    total: number,
    payment_type: string,
    installments: number, 
    card: ICard,
    customer: ICustomerForTransaction,
    billing: IBilling,
    items: OrdersProducts[],
}

interface ITransactionProvider {

    process(data: ITransactionProviderRequest ): Promise<any>
}

export {ITransactionProvider, ITransactionProviderRequest}