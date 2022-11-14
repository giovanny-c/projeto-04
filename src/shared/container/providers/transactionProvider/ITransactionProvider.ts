
import { TransactionStatus } from "@modules/Transactions/types/TransactionStatus";
import { ITransactionProviderRequest, ITransactionProviderResponse} from "./dtos/ITransactionProviderDTOs";


interface ITransactionProvider {

    proccess(data: ITransactionProviderRequest): Promise<ITransactionProviderResponse>
    translateStatus(status: string): TransactionStatus 
}

export {ITransactionProvider}