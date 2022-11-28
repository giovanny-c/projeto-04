


interface ICalculatePriceAndDeliveryTimeRequest {
        vendorFacilityZipcode: string
        customerZipcode: string
        productShape: Shape
        productWeight: number
        productLenght: number
        productHeight: number
        productWidth: number
        typeOfService: Service[]
        productDiameter: number
        deliveryOnlytoCustomer?: YesOrNo
        declaredValue?: number //do pedido
        receptionNotice?: YesOrNo // se vai receber aviso quando for intregue ao cliente

}

type Service = 
    "04014" |// = SEDEX à vista
    "04065" |// = SEDEX à vista pagamento na entrega
    "04510" |// = PAC à vista
    "04707" |// = PAC à vista pagamento na entrega
    "40169" |// = SEDEX12 ( à vista e a faturar)
    "40215" |// = SEDEX 10 (à vista e a faturar)
    "40290"  // = SEDEX Hoje Varejo


type Shape = 
"1"| //= Formato caixa/pacote
"2"| //= Formato rolo/prisma
"3"  // = Envelope

type YesOrNo = "S" | "N"

export {ICalculatePriceAndDeliveryTimeRequest, Shape, Service}