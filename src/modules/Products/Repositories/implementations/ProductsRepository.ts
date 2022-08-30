import { ISaveProduct } from "@modules/Products/dtos/ISaveProductDTO";
import { Product } from "@modules/Products/entities/Product";
import { dataSource } from "../../../../database";
import { Between, Repository } from "typeorm";
import { IProductsRepository } from "../IProductsRepository";
import { IFindProducts } from "@modules/Products/dtos/IFindProductsDTO";


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

    async find({
        search_query,
        price_range = [0, 10 ** 5],
        vendor_name,
        order_by = { sort: "available", order: "ASC" },
        limit = 20,
        offset = 0,
    }: IFindProducts): Promise<Product[]> {


        const query = this.repository.createQueryBuilder("p")


        // if (vendor_name) {
        //     query.leftJoin("vendor", "u", "ON u.name = :vendor_name", { vendor_name })
        // }

        if (search_query) {
            query.where(`p.name LIKE :name`, { name: `%${search_query}%` })
        }

        // if (price_range) {
        //     query.andWhere("p.price BETWEEN :price1 AND :price2", { price1: price_range[0], price2: price_range[1] })
        // }

        // if(category_id){
        // }

        // if (order_by.sort && order_by.order) {
        //     query.orderBy(order_by.sort, order_by.order)
        // }

        // query.limit(limit).offset(offset)

        console.log(query.getQuery())
        const products = await query.getMany()

        return products

    }


    async deleteProduct(id: string): Promise<void> {
        await this.repository.delete(id)
    }

}

export { ProductsRepository }