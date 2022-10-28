
import { TransactionStatus } from "@modules/Transactions/types/TransactionStatus";
import { IPagarMeProviderRequest, IPagarMeProviderResponse } from "./dtos/IPagarmeProviderDTOs";


interface ITransactionProvider {

    proccess(data: IPagarMeProviderRequest): Promise<IPagarMeProviderResponse>
    translateStatus(status: string): TransactionStatus 
}

export {ITransactionProvider}