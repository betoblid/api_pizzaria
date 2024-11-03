import { Request, Response } from "express";
import { DetailUserService } from "../services/user/detailUserService";


class detailUserController {

    async handler(req: Request, res: Response) {

      const user_id = req.user_id

        const detailuserservice = new DetailUserService()

        const user = await detailuserservice.execute( user_id )

      res.json(user)
    }
}

export { detailUserController }