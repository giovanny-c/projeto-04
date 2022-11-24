import { ISaveCategory } from "@modules/Categories/dtos/ISaveCategoyDTO";
import { Category } from "@modules/Categories/entities/Category";
import { dataSource } from "database";
import { Repository } from "typeorm";
import { ICategoriesRepository } from "../ICategoriesRepository";




class CategoriesRepository implements ICategoriesRepository {


    private repository: Repository<Category>

    constructor() {

        this.repository = dataSource.getRepository(Category)
    }
    


    async save({ id, name, description }: ISaveCategory): Promise<Category> {

        const category = this.repository.create({
            id,
            name,
            description
        })

        return await this.repository.save(category)

    }
    
    async findByName(name: string): Promise<Category> {
        return await this.repository.findOne({
            where: {name},
                        
        }) as Category
    }
    async findById(id: string): Promise<Category> {

        return await this.repository.findOneBy({ id }) as Category
    }
    async delete(id: any): Promise<void> {

        await this.repository.delete(id)
    }

}

export { CategoriesRepository }