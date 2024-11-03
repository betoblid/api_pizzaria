import { Request, Response } from "express";
import { CreateOrderServices } from "../../services/Order/CreateOrderServices";



class CreateOrderController {

    async handler(req: Request, res: Response){

        const {table, name} = req.body

        const CreateOrderService = new CreateOrderServices()

        const Order = await CreateOrderService.execute({table, name})

        return res.json(Order)
    }
}

export { CreateOrderController }