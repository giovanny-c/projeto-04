import { ISaveProduct, IUpdateProductQuantity } from "@modules/Products/dtos/ISaveProductDTO";
import { Product } from "@modules/Products/entities/Product";
import { dataSource } from "../../../../database";
import { Between, In, Repository } from "typeorm";
import { IProductsRepository } from "../IProductsRepository";
import { IFindProducts, IFindProductsById } from "@modules/Products/dtos/IFindProductsDTO";


class ProductsRepository implements IProductsRepository {

    private repository: Repository<Product>

    constructor() {
        this.repository = dataSource.getRepository(Product)

        
    }


   


    async save({ id, name, vendor_id, price, old_price, description, quantity, available, created_at, updated_at, category_id, sells, rating, votes }: ISaveProduct): Promise<Product> {
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
            updated_at,
            category_id,
            sells,
            rating,
            votes
        })

        return await this.repository.save(product)

    } 
    
    
    async saveMany(products: IUpdateProductQuantity[]): Promise<Product[]> {
        return await this.repository.save(products)
    }
    

    async findById(id: string): Promise<Product> {

        const product = await this.repository.findOneBy({ id })
        //fazer find com relations de user
        return product as Product

    }
    
    async findAllByIds(products: IFindProductsById[]): Promise<Product[]> {
        const productsIds = products.map(product => product.id)

        return await this.repository.find({where: {id: In(productsIds)}})
    }
    async findByVendor(vendor_id: string): Promise<Product[]> {

        return await this.repository.findBy({ vendor_id }) as Product[]
    }

    async find({
        search_query,
        price_range = [0, 10 ** 5],
        vendor_name,
        order_by,
        limit,
        offset,
        category_id
    }: IFindProducts): Promise<Product[]> {


        const query = this.repository.createQueryBuilder("p")


        if (vendor_name) {
            query.innerJoin("users", "u", "u.name = :vendor_name", { vendor_name })

        }

        if (search_query) {
            query.where(`p.name LIKE :name`, { name: `%${search_query}%` })
        }

        if (price_range) {
            query.andWhere("p.price BETWEEN :price1 AND :price2", { price1: price_range[0], price2: price_range[1] })
        }

        // if(category_id){
        // }

        if (category_id) {
            query.andWhere("p.category_id = :category_id", { category_id })
        }

        // if(category_id){
        // }
        query.orderBy("available", "DESC", "NULLS LAST")

        if (order_by && order_by.sort && order_by.order) {



            query.addOrderBy(order_by.sort, order_by.order, "NULLS LAST")

            if (order_by.sort === "rating") { //order by ranting and order by votes desc (melhores ratings com mais votos)
                query.addOrderBy("votes", "DESC", "NULLS LAST")
            }
        }

        query.limit(limit).offset(offset)

        const products = await query.getMany()

        return products

    }


    async deleteProduct(id: string): Promise<void> {
        await this.repository.delete(id)
    }

}

export { ProductsRepository }