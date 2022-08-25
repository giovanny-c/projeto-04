import { ISaveProduct } from "@modules/Products/dtos/ISaveProductDTO";
import { Product } from "@modules/Products/entities/Product";
import { dataSource } from "../../../../database";
import { Repository } from "typeorm";
import { IProductsRepository } from "../IProductsRepository";


class ProductsRepository implements IProductsRepository {

    private repository: Repository<Product>

    constructor() {
        this.repository = dataSource.getRepository(Product)
    }

    async save({ id, name, vendor_id, price, old_price, description, quantity, available, created_at, updated_at }: ISaveProduct): Promise<Product> {
        //FALTA O NOME DO PRODUTO
        const product = this.repository.create({
            id,
            name,
            vendor_id,
            price,
            old_price,
            description,
            quantity,
            available,
            created_at,
            updated_at
        })

        return await this.repository.save(product)

    }
    async findById(id: string): Promise<Product> {
        console.log(id)
        const product = await this.repository.findOneBy({ id })
        //fazer find com relations de user
        return product as Product

    }
    async findByVendor(vendor_id: string): Promise<Product[]> {

        return await this.repository.findBy({ vendor_id }) as Product[]
    }
    async deleteProduct(id: string): Promise<void> {
        await this.repository.delete(id)
    }

}

export { ProductsRepository }