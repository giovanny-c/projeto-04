import { Address } from "@modules/Accounts/entities/Address"


interface IGetProfileRequest {
    id: string
}

interface IGetProfileResponse {

    email: string
    name: string
    addresses: Address[]
}

export { IGetProfileRequest, IGetProfileResponse }