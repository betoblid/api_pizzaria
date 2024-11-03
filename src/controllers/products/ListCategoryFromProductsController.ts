import { Request, Response } from "express"
import { ListCategoryService } from "../../services/product/ListCategoryFromProductsService"



class ListCategoryFromProductsController {


    async handler(req: Request, res: Response) {

        const category_id = req.query.category_id as string

        if(!category_id){
            throw new Error("Id not exist")
        } else {

            const FindByProducts = new ListCategoryService()

            const Products = await FindByProducts.execute({category_id})

            return res.json(Products)
        }
    }
}

export { ListCategoryFromProductsController }