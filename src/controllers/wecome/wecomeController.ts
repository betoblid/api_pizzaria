import { Request, Response } from "express"


class wecomeController {


    async handle(req: Request, res: Response) {


    const message = {message: "Bem vindo a nossa API pizzaria 1.0"}

    res.status(200).json(message)
    }
}

export { wecomeController }