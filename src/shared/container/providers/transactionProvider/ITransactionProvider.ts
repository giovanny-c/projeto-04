
import { IPagarMeProviderRequest, IPagarMeProviderResponse } from "./dtos/IPagarmeProviderDTOs";


interface ITransactionProvider {

    proccess(data: IPagarMeProviderRequest): Promise<IPagarMeProviderResponse>
}

export {ITransactionProvider}