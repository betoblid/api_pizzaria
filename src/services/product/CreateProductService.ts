import prismaClient from "../../prisma";



interface ProductRequest {
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string;
}

class CreateProductService {

    async execute({ banner, category_id, description, name, price }: ProductRequest) {

        const NewProductCreateBanco = await prismaClient.product.create({
            data: {
                banner,
                description,
                name,
                price,
                category_id,

            }
        })

        return NewProductCreateBanco

    }
}

export { CreateProductService }