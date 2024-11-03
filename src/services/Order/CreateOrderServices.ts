import { Request, Response } from "express";
import prismaClient from "../../prisma";


interface OrderRequest{
    table: number;
    name: string
}
class CreateOrderServices {

    async execute({name, table}: OrderRequest) {

        const CreateOrder = await prismaClient.order.create({
            data: {
                table: table,
                name: name
            }
        })

        return CreateOrder

    }
}

export { CreateOrderServices }