import { IFileRequestUrl } from "@modules/File/dtos/IFileRequestUrlDTO";
import { ISaveFile } from "@modules/File/dtos/ISaveFileDTO";
import { File } from "@modules/File/entities/File";
import { dataSource } from "database";
import { Repository } from "typeorm";
import { IFileRepository } from "../IFileRepository";


class FileRepository implements IFileRepository {

    private repository: Repository<File>

    constructor() {
        this.repository = dataSource.getRepository(File)
    }


    async save({ id, user_id, product_id, name, mime_type, created_at, updated_at, extension, size, storage_type, permission }: ISaveFile): Promise<File> {

        const file = this.repository.create({
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
            updated_at

        })

        await this.repository.save(file)

        return file

    }
    async findById(id: string): Promise<File> {


        const file = await this.repository.findOneBy({ id }) as File

        return file


    }


    async findByUserId(user_id: string): Promise<File[]> {
        const file = await this.repository.findBy({ user_id })

        return file


    }

    async getFileUrlByIdOrProductId({ file_id, product_id }: IFileRequestUrl): Promise<File | File[]> {

        let files

        if (product_id) {
            files = await this.repository.find({
                select: ["id", "storage_type", "mime_type", "name"],
                where: { product_id }
            }) as File[]
        }

        if (!product_id) {
            files = await this.repository.findOne({
                select: ["id", "storage_type", "mime_type", "name"],
                where: { id: file_id }
            }) as File
        }


        return files
    }

    async countFilesByProductId(product_id: any): Promise<number> {

        return await this.repository.countBy({ product_id })
    }

    async delete(id: string): Promise<void> {

        await this.repository.delete(id)
    }

}

export { FileRepository }