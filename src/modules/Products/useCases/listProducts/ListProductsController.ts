import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { ListProductsUseCase } from "./ListProductsUseCase";



class ListProductsController {

    async handle(req: Request, res: Response): Promise<Response> {

        const { search_query } = req.body
        let { vendor_name, sort, order, limit, offset, available, minPrice, maxPrice } = req.query

        const listProductsUseCase = container.resolve(ListProductsUseCase)


        let price_range, maxResults, property

        if (Number(minPrice) === NaN || Number(maxPrice) === NaN) {
            price_range = undefined
        } else {
            price_range = [Number(minPrice), Number(maxPrice)]
        }


        if (limit === undefined || Number(limit) === NaN) {
            maxResults = 20
        }
        if (Number(limit) > 50) {
            maxResults = 50
        }

        if (sort !== "name" || "price" || "created_at" || "updated_at") {
            sort === "updated_at"
        }



        const response = await listProductsUseCase.execute({
            available: true,
            search_query,
            vendor_name: vendor_name as string,
            //price_range,
            // order_by: {
            //     sort: "updated_at",
            //     order: /*!order ? "ASC" :*/ order === "ASC" ? "ASC" : order === "DESC" ? "DESC" : "ASC" //se order nao conter "ASC" OU "DESC" vai ser ASC por padrao
            // },
            limit: maxResults,
            offset: undefined
        })




        return res.status(200).json(response)
    }

}
export { ListProductsController }