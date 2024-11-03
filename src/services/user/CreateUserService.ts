import { Request, Response } from "express";
import prismaClient from "../../prisma";
import { hash } from "bcryptjs";



interface UserRequest {
    name: string,
    email: string,
    password: string
}

class CreateUserService{

    async execute({email, name, password}: UserRequest) {

        //verificar se esse email já está cadastrado n plataforma
        const userExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })
        //verificar se usuário existe
        if(userExists){
            throw new Error("email existente")
        }

        //criptografando a senha
        const passwordHash = await hash(password, 8);

        //criar usuário no banco de dados
        const ResUser = await prismaClient.user.create({
            data: {
                email: email,
                name: name,
                password: passwordHash
            },
            //selecionar o que vai ser retornado para o usuário quando criar um user
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        return ResUser
    }
}

export { CreateUserService }