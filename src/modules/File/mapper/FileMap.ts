
import { instanceToInstance } from "class-transformer";
import { IFileResponseDTO } from "../dtos/IFileResponseDTO";
import { File } from "../entities/File";


class FileMap {

    static toDTO({
        id,
        user_id,
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
    static return_URL({ id, file_url }: File) {

        const file = instanceToInstance({
            id, //necessario
            file_url
        })

        return file
    }
}

export { FileMap }