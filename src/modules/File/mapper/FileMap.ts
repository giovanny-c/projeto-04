
import { instanceToInstance } from "class-transformer";
import { IFileResponseDTO } from "../dtos/IFileResponseDTO";
import { File } from "../entities/File";


class FileMap {

    static toDTO({
        id,
        user_id,
        product_id,
        name,
        mime_type,
        extension,
        size,
        storage_type,
        permission,
        created_at,
        updated_at,
        file_url }: File): IFileResponseDTO {


        const file = instanceToInstance({
            id,
            user_id,
            product_id,
            name,
            mime_type,
            extension,
            size,
            storage_type,
            permission,
            created_at,
            updated_at,
            file_url
        })

        return file

    }



    //para retornar apenas id e o file url
    //ou fazer o mapper nos files do product?
    static return_URL({ id, storage_type, mime_type, name, file_url }: File) {

        const file = instanceToInstance({
            id,
            storage_type,
            mime_type,
            name,
            file_url
        })

        return {
            id: file.id,
            url: file.file_url
        }
    }
}

export { FileMap }