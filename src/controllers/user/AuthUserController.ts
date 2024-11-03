import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";



class AuthUserController {

    async handle(req: Request, res: Response) {

        const {email, password} = req.body

        //verificar se está recebendo email e password
        if(!email || !password){
            throw new Error("email e password é obrigatorio")
        }
        //iniciando serviço
        const auth = new AuthUserService()


        const response = await auth.execute({email, password})

        res.json(response)
    }
}

export { AuthUserController }