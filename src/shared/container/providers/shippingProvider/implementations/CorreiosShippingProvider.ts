import {calcularPrecoPrazo, consultarCep, rastrearEncomendas, CepResponse, PrecoPrazoRequest} from "correios-brasil"
import { ICalculatePriceAndDeliveryTimeRequest } from "../dtos/ShippingDTOs"
import { IShippingProvider } from "../IShippingProvider"


class CorreiosShippingProvider implements IShippingProvider {


    //consultar cep
    async validZipcode(zipcode: string): Promise<CepResponse>{

        return await consultarCep(zipcode)
    
         
    }
    
    

    //calcular preços e prazos
    async calculatePriceAndDeliveryTime({
        vendorFacilityZipcode,
        customerZipcode,
        productWeight,
        productShape,
        productLenght,
        productHeight,
        productWidth,
        typeOfService,
        productDiameter,
        deliveryOnlytoCustomer,
        declaredValue,
        receptionNotice

    }: ICalculatePriceAndDeliveryTimeRequest){
       
        let args = {
        sCepOrigem: vendorFacilityZipcode,
        sCepDestino: customerZipcode,
        nVlPeso: String(productWeight),
        nCdFormato: String(productShape),
        nVlComprimento: String(productLenght),
        nVlAltura: String(productHeight),
        nVlLargura: String(productWidth),
        nCdServico: typeOfService,
        nVlDiametro: String(productDiameter),
        sCdMaoPropria: deliveryOnlytoCustomer, // n padrao
        nVlValorDeclarado: declaredValue,
        sCdAvisoRecebimento: receptionNotice // n padrao
        } as PrecoPrazoRequest 

        return await calcularPrecoPrazo(args)

    }


    async orderTracking(trackingCode: string){

        return await rastrearEncomendas([trackingCode])
    }


    //rastrear emcomenda
}
//ver melhor os docs
export{CorreiosShippingProvider}