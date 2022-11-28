
interface ISaveUserDTO {

    id?: string

    name?: string

    email?: string

    password?: string

    password_hash?: string

    salt?: string

    is_confirmed?: boolean

    is_logged?: boolean

    admin?: boolean

    address_id?: string
}

export { ISaveUserDTO }