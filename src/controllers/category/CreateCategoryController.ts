import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";



class CreateCategoryController{


    async handler(req: Request, res: Response) {

        const { name } = req.body

        const createcategory = new CreateCategoryService()

        const category = await createcategory.execute({name})

        return res.json(category)
    }

}

export { CreateCategoryController }