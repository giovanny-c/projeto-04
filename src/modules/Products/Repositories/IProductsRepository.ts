import { ISaveProduct } from "../dtos/ISaveProductDTO"
import { Product } from "../entities/Product"


interface IProductsRepository {

    save(data: ISaveProduct): Promise<Product>
    findById(id: string): Promise<Product>
    findByVendor(vendor_id: string): Promise<Product[]>
    deleteProduct(id: string): Promise<void>

}

export { IProductsRepository }