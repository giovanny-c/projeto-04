import { IFile } from "@modules/File/dtos/IFileDTO"


interface ISaveFileForProductsRequest {
    images?: IFile[]
    product_id: string
    user_id: string
    deleted_images_ids?: string[]
}

export { ISaveFileForProductsRequest }