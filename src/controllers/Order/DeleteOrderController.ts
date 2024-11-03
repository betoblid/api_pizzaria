import { Request, Response } from "express";
import { DeleteOrderServices } from "../../services/Order/DeleteOrderServices";


class DeleteOrderController {
    async handler(req: Request, res: Response) {

        const Order_id = req.query.order_id as string;

            const DeleteOrderService = new DeleteOrderServices()

            const RemoveOrder = await DeleteOrderService.execute({  table_id: Order_id })

            return res.json({message: "Pedido Removido com sucesso."})

        
    }
}

export { DeleteOrderController }