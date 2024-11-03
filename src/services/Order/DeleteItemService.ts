import prismaClient from "../../prisma"



interface ItemRequest {
    item_id: string;
}
class DeleteItemService {

    async execute({item_id}: ItemRequest){

        const RemoveItem = await prismaClient.item.delete({
            where: {
                id: item_id
            }
        })

        return RemoveItem
    }
}

export { DeleteItemService }