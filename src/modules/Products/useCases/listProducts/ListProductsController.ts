
import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { ListProductsUseCase } from "./ListProductsUseCase";



class ListProductsController {

    async handle(req: Request, res: Response): Promise<Response> {
        try {


            const { search_query } = req.body
            let { vendor_name, sort, order, limit, offset, minPrice, maxPrice } = req.query || req.body

            const listProductsUseCase = container.resolve(ListProductsUseCase)

            let price_range, maxResults, skip, order_by


            if (Number(minPrice) === NaN || Number(maxPrice) === NaN) {
                price_range = undefined
            } else {
                price_range = [Number(minPrice), Number(maxPrice)]
            }

            if (Number(limit) === NaN || limit === undefined) {
                maxResults = 20
            }
            if (maxResults > 50) {
                maxResults = 50
            }
            else {
                maxResults = Number(limit)
            }

            if (Number(offset) === NaN || offset === undefined) {
                skip = 20
            }
            else {
                skip = Number(offset)
            }

            if (sort !== "updated_at" || "sells" || "rating") {
                order_by = "updated_at"
            }

            const response = await listProductsUseCase.execute({
                search_query,
                vendor_name: vendor_name as string,
                price_range,
                order_by: {
                    sort: order_by,
                    order: /*!order ? "ASC" :*/ order === "ASC" ? "ASC" : order === "DESC" ? "DESC" : "DESC" //se order nao conter "ASC" OU "DESC" vai ser DESC por padrao
                },
                limit: maxResults,
                offset: skip
            })




            return res.status(200).json(response)

        } catch (error) {
            throw error
        }
    }

}
export { ListProductsController }