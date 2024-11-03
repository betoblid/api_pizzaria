import prismaClient from "../../prisma"



interface categoryRequest{
    name: string

}
class CreateCategoryService {


    async execute({ name }: categoryRequest){

        // verificar se existe um nome de categoria
        if(name === "" ){
            //retorna mensagem de erro para o usuário informando que não foi informado o nome da nova categoria
            throw new Error("Name Invalid")
        }

        const category = await prismaClient.category.create({
            data: {
                name: name
            },
            select: {
                id: true,
                name: true
            }
            
        });

        return category
    }
}

export { CreateCategoryService }