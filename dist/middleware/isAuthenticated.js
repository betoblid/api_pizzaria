"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
    //receber o token
    const authToken = req.headers.authorization;
    // se não tiver enviado um TOken finalize a conecxão
    if (!authToken) {
        return res.status(401).end();
    }
    // pegue o token que está cendo enviado
    const [bearer, token] = authToken.split(" ");
    try {
        //validar o token que foi recebido
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.SECRET_JWT);
        // recuperar o ID do token e colocar dentro de uma variavel de request para usar quando quiser no controller
        req.user_id = sub;
        return next(); // proseguir para o controller se o token está certo
    }
    catch (err) {
        return res.status(401).end();
    }
}
