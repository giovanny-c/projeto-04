import { ISaveFile } from "@modules/File/dtos/ISaveFileDTO";
import { File } from "@modules/File/entities/File";
import { IFileRepository } from "../IFileRepository";
import { v4 as uuidV4 } from "uuid"
import { IFileRequestUrl } from "@modules/File/dtos/IFileRequestUrlDTO";


class FileRepositoryInMemory implements IFileRepository {

    getFileUrlByIdOrProductId({ id, product_id }: IFileRequestUrl): Promise<File | File[]> {
        throw new Error("Method not implemented.");
    }

    private repository: File[] = []

    async save({ id = uuidV4(), mime_type, name, user_id, extension, path, size, storage_type, created_at = new Date(), updated_at, permission = "public" }: ISaveFile): Promise<File> {

        let file = new File()

        Object.assign(file, {
            id,
            mime_type,
            name,
            user_id,
            extension,
            path,
            size,
            permission,
            created_at,
            updated_at,
            storage_type
        })

        this.repository.push(file)

        return file
    }
    async findById(id: string): Promise<File> {

        return this.repository.find(file => file.id === id) as File
    }
    async findByUserId(user_id: string): Promise<File[]> {

        const files = this.repository.filter((file) => {
            if (file.user_id === user_id) {
                return file
            }


        })

        return files
    }
    async delete(id: string): Promise<void> {

        const file = this.repository.find(file => file.id === id) as File

        this.repository.splice(
            this.repository.indexOf(file)
        )

    }

}

export { FileRepositoryInMemory }