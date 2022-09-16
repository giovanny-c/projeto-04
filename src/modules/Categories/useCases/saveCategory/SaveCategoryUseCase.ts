import { Category } from "@modules/Categories/entities/Category";
import { ICategoriesRepository } from "@modules/Categories/repositories/ICategoriesRepository";
import { setRedis } from "@shared/redis/redisConfig";
import { inject, injectable } from "tsyringe";

@injectable()
class SaveCategoryUseCase {

    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {

    }

    async execute(name: string, description: string, id?: string): Promise<Category> {

        try {

            if (id) {
                const category = await this.categoriesRepository.findById(id)

                if (category) {

                    setRedis(category.id as string, JSON.stringify(category))

                    return await this.categoriesRepository.save({ id: category.id, name, description })
                }


            }

            return await this.categoriesRepository.save({ name, description })

        } catch (error) {
            throw error
        }


    }
}

export { SaveCategoryUseCase }