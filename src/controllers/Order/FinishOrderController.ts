import { Request, Response } from "express";
import { FinishOrderService } from "../../services/Order/FinishOrderService";



class FinishOrderController {
    async handle(req: Request, res: Response){

        const order_id = req.body.order_id as string;


        const FinishOrder = new FinishOrderService()

        const order = await FinishOrder.execute({order_id})

        return res.json(order)
    }
}

export { FinishOrderController }