import { ISaveProduct, IUpdateProductQuantity } from "../dtos/ISaveProductDTO"
import { IFindProducts, IFindProductsById } from "../dtos/IFindProductsDTO"
import { Product } from "../entities/Product"


interface IProductsRepository {

    save(product: ISaveProduct): Promise<Product>
    saveMany(products: IUpdateProductQuantity[]): Promise<Product[]>
    findById(id: string): Promise<Product>
    findAllByIds(products: IFindProductsById[]): Promise<Product[]>
    findByVendor(vendor_id: string): Promise<Product[]>
    deleteProduct(id: string): Promise<void>
    find(data: IFindProducts): Promise<Product[]>

}

export { IProductsRepository }