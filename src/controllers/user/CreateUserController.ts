import {Request, Response} from "express"
import { CreateUserService } from "../../services/user/CreateUserService"


class CreateUserController {

    async handle(req: Request, res:Response) {

        const { name, email, password } = req.body

        if(!name || !email || !password) {
            throw new Error("Envie todos os campos")
        }

        const UserService = new CreateUserService()

        const User = await UserService.execute({email, name, password})

        return res.json(User)
    }
}

export { CreateUserController }