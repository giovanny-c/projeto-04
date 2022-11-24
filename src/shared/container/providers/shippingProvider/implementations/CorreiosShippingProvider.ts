import {calcularPrecoPrazo, consultarCep, rastrearEncomendas, CepResponse, PrecoPrazoRequest} from "correios-brasil"


class CorreiosShippingProvider {


    //consultar cep
    async validZipcode(zipcode: string): Promise<CepResponse>{

        return await consultarCep(zipcode)
    
         
    }
    
    

    //calcular preços e prazos
    async valculatePriceAndDeliveryTime({
        vendorFacilityZipcode,
        customerZipcode,
        productWeight,
        productShape,
        productLenght,
        productHeight,
        productWidth,
        typeOfService,
        productDiameter,

    }){
       
        let args = {
        sCepOrigem: vendorFacilityZipcode,
        sCepDestino: customerZipcode,
        nVlPeso: productWeight,
        nCdFormato: productShape,
        nVlComprimento: productLenght,
        nVlAltura: productHeight,
        nVlLargura: productWidth,
        nCdServico: typeOfService ,
        nVlDiametro: productDiameter,
        } 

        return await calcularPrecoPrazo(args)

    }


    async orderTracking(trackingCode: string){

        return await rastrearEncomendas([trackingCode])
    }


    //rastrear emcomenda
}
//ver melhor os docs
export{CorreiosShippingProvider}