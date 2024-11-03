import { compare } from "bcryptjs"
import prismaClient from "../../prisma"
import { sign } from "jsonwebtoken"


//tipando os params que recebera 
interface AuthRequest {
    email: string,
    password: string

}
class AuthUserService {

    async execute({ email, password }: AuthRequest) {

        //verificar se email existe no banco
        const UserExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })
        //se não existe retorne um erro
        if (!UserExists) {
            throw new Error("usuário não existe")

        }

        //verificar se a password está certo
        const passwordMatch = await compare(password, UserExists.password)

        //retorna um erro se a senha estiver errada
        if (!passwordMatch) {
            throw new Error("user/password incorreta")
        }

        //gerar um token JWT devolvendo id, email e name
        const token = sign(
            {
                name: UserExists.name,
                email: UserExists.email, 
            },
            process.env.SECRET_JWT, // a chave do Token fica na variavel de ambiente
            {
                subject: UserExists.id, // o id será id do usuário
                expiresIn: "30d" // tempo que vai expirar de 30 dias
            }
        )

        //caso de tudo certo retorno um 
        return { 
            id: UserExists.id,
            name: UserExists.name,
            email: UserExists.email,
            token
         }
    }

}

export { AuthUserService }