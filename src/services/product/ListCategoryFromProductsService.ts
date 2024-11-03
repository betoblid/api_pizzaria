import prismaClient from "../../prisma"



interface ProductInterface {
    category_id: string
}
class ListCategoryService {

    async execute({category_id}: ProductInterface){

        const FindByCategory = await prismaClient.product.findMany({
            where: {
                category_id: category_id
            },
        })

        return FindByCategory
    }
}

export { ListCategoryService }