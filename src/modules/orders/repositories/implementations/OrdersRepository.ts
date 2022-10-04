import { ISaveOrder } from "@modules/orders/dtos/ISaveOrderDTO";
import Order from "@modules/orders/entities/Order";
import { dataSource } from "database";
import { Repository } from "typeorm";
import { IOrdersRepository } from "../IOrdersRepository";


class OrdersRepository implements IOrdersRepository{

    private repository: Repository<Order>

    constructor(){
        this.repository = dataSource.getRepository(Order)
    }

    async save({id, customer, products}: ISaveOrder): Promise<Order> {
        const order = this.repository.create({
            id,
            customer,
            order_products: products
        })

        return await this.repository.save(order)


    }
    async findById(id: string): Promise<Order> {
        return await this.repository.findOne({
            relations: {
                order_products: true,
                customer: true,
            },
            where: {id}
        }) as Order
    }
    async findByCustomerId(customer_id: string): Promise<Order[]> {
        return await this.repository.find({
            relations: {
                order_products: true,
                customer: true
            },
            where: {customer_id}
        })
    }

    

}


export {OrdersRepository}