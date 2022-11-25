

interface ICalculatePriceAndDeliveryTimeRequest {
        vendorFacilityZipcode: string
        customerZipcode: string
        productShape: string
        productWeight: number
        productLenght: number
        productHeight: number
        productWidth: number
        typeOfService: string[]
        productDiameter: number
}

export {ICalculatePriceAndDeliveryTimeRequest}