
interface IAuthenticationResponse {
    user: {
        id: string
        email?: string
        admin?: boolean
    }
    created_at?: Date
    token?: string
    refresh_token?: string


}


export { IAuthenticationResponse }