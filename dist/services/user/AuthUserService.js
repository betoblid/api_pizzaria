"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = __importDefault(require("../../prisma"));
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            //verificar se email existe no banco
            const UserExists = yield prisma_1.default.user.findFirst({
                where: {
                    email: email
                }
            });
            //se não existe retorne um erro
            if (!UserExists) {
                throw new Error("usuário não existe");
            }
            //verificar se a password está certo
            const passwordMatch = yield (0, bcryptjs_1.compare)(password, UserExists.password);
            //retorna um erro se a senha estiver errada
            if (!passwordMatch) {
                throw new Error("user/password incorreta");
            }
            //gerar um token JWT devolvendo id, email e name
            const token = (0, jsonwebtoken_1.sign)({
                name: UserExists.name,
                email: UserExists.email,
            }, process.env.SECRET_JWT, // a chave do Token fica na variavel de ambiente
            {
                subject: UserExists.id, // o id será id do usuário
                expiresIn: "30d" // tempo que vai expirar de 30 dias
            });
            //caso de tudo certo retorno um 
            return {
                id: UserExists.id,
                name: UserExists.name,
                email: UserExists.email,
                token
            };
        });
    }
}
exports.AuthUserService = AuthUserService;
