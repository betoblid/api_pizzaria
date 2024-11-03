import { Request, Response } from "express";
import { DeleteItemService } from "../../services/Order/DeleteItemService";



class DeleteItemController {

    async handle(req: Request, res: Response) {

        const item_id = req.query.item_id as string

        const RemoveItem = new DeleteItemService()

        const Order = await RemoveItem.execute({item_id})

        return res.json(Order)
    }
}

export { DeleteItemController }