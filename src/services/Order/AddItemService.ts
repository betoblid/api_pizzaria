import prismaClient from "../../prisma";




interface ItemRquest {
    order_id: string;
    product_id: string;
    amount: number;
}
class AddItemService {
    async execute({ amount, order_id, product_id}: ItemRquest) {

        const order = await prismaClient.item.create({
            data: {
                order_id: order_id,
                products_id: product_id,
                amount
            }
        })

        return order

    }
}

export { AddItemService }