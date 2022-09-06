import { Category } from "@modules/Categories/entities/Category";
import { ICategoriesRepository } from "@modules/Categories/repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class DeleteCategoryUseCase {

    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {

    }

    async execute(id: string): Promise<void> {

        try {

            await this.categoriesRepository.delete(id)

        } catch (error) {
            throw error
        }


    }
}

export { DeleteCategoryUseCase }