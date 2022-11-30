import { ISaveOrder } from "@modules/Orders/dtos/ISaveOrderDTO";
import Order from "@modules/Orders/entities/Order";

import { dataSource } from "database";
import { Repository } from "typeorm";
import { IOrdersRepository } from "../IOrdersRepository";
import IUpdateStatusOrder from "@modules/Orders/dtos/IUpdateOrderStatusDTO";
import IUpdateOrderValueDTO from "@modules/Orders/dtos/IUpdateOrderValueDTO";


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
        .leftJoin("product.vendor", "vendor")
        .select(["order", "order_products", "product.id", "product.name", "customer.id", "customer.name", "customer.email", "vendor.name", "vendor.id", "vendor.email"])
        .where("order.id = :id", {id})
        .getOne()

        return order as Order
        
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
    
    async findByVendorId(vendor_id: string): Promise<Order[]> {
        const orders = await this.repository.createQueryBuilder("order")
        .leftJoin("order.order_products", "order_products")
        .leftJoin("order_products.product", "product")
        .leftJoin("order.customer", "customer")
        .leftJoin("product.vendor", "vendor")
        .select(["order", "order_products", "product.id", "product.name", "customer.id", "customer.name", "customer.email"])
        .where("vendor.id = :vendor_id", {vendor_id})
        .orderBy("order.updated_at", "DESC")
        .addOrderBy("order.status ", "DESC")
        .getMany()

        return orders
    }

    async findByIdAndVendorId(id: string, vendor_id: string): Promise<Order> {
        const order = await this.repository.createQueryBuilder("order")
        .leftJoin("order.order_products", "order_products")
        .leftJoin("order_products.product", "product")
        .leftJoin("order.customer", "customer")
        .leftJoin("product.vendor", "vendor")
        .select(["order", "order_products", "product.id", "product.name", "customer.id", "customer.name", "customer.email"])
        .where("order.id = :id", {id})
        .andWhere("vendor.id = :vendor_id", {vendor_id})
        .orderBy("order.updated_at", "DESC")
        .addOrderBy("order.status ", "DESC")
        .getOne() 

        return order as Order
    }
    
    async updateOrderStatus({id, status, updated_at}: IUpdateStatusOrder): Promise<Order> {
        const order = this.repository.create({
            id,
            status,
            updated_at
        })

        return await this.repository.save(order)
    }

    
    async updateOrderValue({id, total, updated_at}: IUpdateOrderValueDTO) {
        const order = this.repository.create({
            id,
            total,
            updated_at
        })

        return await this.repository.save(order)
    }


}


export {OrdersRepository}