import { Request, Response } from "express";
import { ListOrdersService } from "../../services/Order/ListOrdersService";



class ListOrdersController {

    async handle(req: Request, res: Response){

        const ListOders = new ListOrdersService()

        const order = await ListOders.execute()

        return res.json(order)
    }
}

export { ListOrdersController }