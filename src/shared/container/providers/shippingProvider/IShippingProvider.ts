import { CepResponse, PrecoPrazoResponse} from "correios-brasil"
import { ICalculatePriceAndDeliveryTimeRequest } from "./dtos/ShippingDTOs"


interface IShippingProvider {

    validZipcode(zipcode: string): Promise<any>
    calculatePriceAndDeliveryTime(data: ICalculatePriceAndDeliveryTimeRequest): Promise<PrecoPrazoResponse>
    orderTracking(trackingCode: string): Promise<any>

}

export{IShippingProvider}