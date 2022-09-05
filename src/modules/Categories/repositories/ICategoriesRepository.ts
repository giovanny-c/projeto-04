import { ISaveCategory } from "../dtos/ISaveCategoyDTO"
import { Category } from "../entities/Category"


interface ICategoriesRepository {


    save(data: ISaveCategory): Promise<Category>
    findById(id: string): Promise<Category>
    delete(id): Promise<void>

}

export { ICategoriesRepository }