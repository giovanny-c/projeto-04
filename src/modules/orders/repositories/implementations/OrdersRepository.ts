import ICancelOrder from "@modules/Orders/dtos/ICancelOrderDTO";
import { ISaveOrder } from "@modules/Orders/dtos/ISaveOrderDTO";
import Order from "@modules/Orders/entities/Order";

import { dataSource } from "database";
import { Repository } from "typeorm";
import { IOrdersRepository } from "../IOrdersRepository";


class OrdersRepository implements IOrdersRepository{

    private repository: Repository<Order>

    constructor(){
        this.repository = dataSource.getRepository(Order)
    }
    
    async save({id, customer, products, status, updated_at, created_at, total}: ISaveOrder): Promise<Order> {
        const order = this.repository.create({
            id,
            customer,
            order_products: products,
            status,
            created_at,
            updated_at,
            total
        })

        return await this.repository.save(order)


    }
    async findById(id: string): Promise<Order> {
        
        const order = await this.repository.createQueryBuilder("order")
        .leftJoinAndSelect("order.order_products", "order_products")
        .leftJoin("order_products.product", "product")
        .leftJoin("order.customer", "customer")
        .select(["order", "order_products", "product.id", "product.name", "customer.id", "customer.name", "customer.email"])
        .where("order.id = :id", {id})
        .getOne()

        return order as Order


        // return await this.repository.findOne({
        //     relations: [
        //         "order_products",
        //         "order_products.product",
        //         "customer"
        //     ],
        //     where: {id}
        // }) as Order
    }
    async findByCustomerId(customer_id: string): Promise<Order[]> {
        return await this.repository.find({
            relations: {
                order_products: true,
                customer: true
            },
            where: {customer_id},
            order: {updated_at: "ASC"}
        })
    }
    
    
    async cancelOrder({id, status, updated_at}: ICancelOrder): Promise<Order> {
        const order = this.repository.create({
            id,
            status,
            updated_at
        })

        return await this.repository.save(order)
    }

    
    

}


export {OrdersRepository}