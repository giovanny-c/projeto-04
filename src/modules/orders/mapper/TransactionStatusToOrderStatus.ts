
import { OrderStatus } from "../types/OrderStatus"


export default function TransactionStatusToOrderStatus( status: string): OrderStatus{

    let response: OrderStatus

    const statusMap = {
        processing: "PENDING"  ,
        pending: "PROCESSING PAYMENT",
        approved: "PAYMENT APROVED",
        refused: "PAYMENT REFUSED",
        refunded: "REFUNDED",
        chargeback: "CHARGEBACK",
    }
    
    
    response = statusMap[status]
    
    console.log(typeof response)

    return response 
      //vai retornar o valor do propriedade de statusMap em que a propriedade corresponder
      // ao valor do parametro status

}

