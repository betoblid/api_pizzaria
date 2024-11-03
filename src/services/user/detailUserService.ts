import prismaClient from "../../prisma";


class DetailUserService {

    async execute(user_id: string) {

        //buscar dados do usuário com o id
        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            //retorna apenas id, name e email para o usuário
            select: {
                id: true,
                name: true,
                email: true
            }
        })
        //retorna o que foi recebido
        return { user }
    }
}

export { DetailUserService }