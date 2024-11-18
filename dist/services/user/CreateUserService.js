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
exports.CreateUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
class CreateUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, name, password }) {
            //verificar se esse email já está cadastrado n plataforma
            const userExists = yield prisma_1.default.user.findFirst({
                where: {
                    email: email
                }
            });
            //verificar se usuário existe
            if (userExists) {
                throw new Error("email existente");
            }
            //criptografando a senha
            const passwordHash = yield (0, bcryptjs_1.hash)(password, 8);
            //criar usuário no banco de dados
            const ResUser = yield prisma_1.default.user.create({
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
            });
            return ResUser;
        });
    }
}
exports.CreateUserService = CreateUserService;
