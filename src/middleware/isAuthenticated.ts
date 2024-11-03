import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";


interface Payload {
    sub: string,


}

export function isAuthenticated( req: Request, res: Response, next: NextFunction) {

    //receber o token
    const authToken = req.headers.authorization;

    // se não tiver enviado um TOken finalize a conecxão
    if(!authToken){
        return res.status(401).end()
    }

    // pegue o token que está cendo enviado
    const [bearer, token] = authToken.split(" ")


    try{
        //validar o token que foi recebido
        const { sub } = verify(
            token,
            process.env.SECRET_JWT
        ) as Payload;

        // recuperar o ID do token e colocar dentro de uma variavel de request para usar quando quiser no controller
        req.user_id = sub

        return next() // proseguir para o controller se o token está certo

    } catch (err) {
        return res.status(401).end()
    }

}