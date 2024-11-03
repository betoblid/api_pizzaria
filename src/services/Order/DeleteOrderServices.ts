import prismaClient from "../../prisma"


interface RequestOrder {
    table_id: string
}
class DeleteOrderServices {

    async execute({ table_id }: RequestOrder) {

        const RemoveOrder = await prismaClient.order.delete({
            where: {
                id: table_id
            }
        })

        return RemoveOrder

    }
}

export { DeleteOrderServices }