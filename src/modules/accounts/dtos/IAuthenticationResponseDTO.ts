
interface IAuthenticationResponse {
    user: {
        id: string
        email?: string
        admin?: boolean
    }
    ttl?: Date
    token?: string
    refresh_token?: string


}


export { IAuthenticationResponse }