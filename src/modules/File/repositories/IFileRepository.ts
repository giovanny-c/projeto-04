import { IFileRequestUrl } from "../dtos/IFileRequestUrlDTO";
import { ISaveFile } from "../dtos/ISaveFileDTO";
import { File } from "../entities/File";



interface IFileRepository {


    save(data: ISaveFile): Promise<File>
    findById(id: string): Promise<File>
    findByUserId(user_id: string): Promise<File[]>
    getFileUrlByIdOrProductId(data: IFileRequestUrl): Promise<File | File[]>
    countFilesByProductId(product_id): Promise<number>
    delete(id: string): Promise<void>

}

export { IFileRepository }