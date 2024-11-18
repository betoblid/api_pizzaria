"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const path_1 = __importDefault(require("path"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
//iniciando o express
const App = (0, express_1.default)();
//declarando que API vai trabalhar no formato JSON
App.use(express_1.default.json());
//habilitando a API aceitar request de IPs estranhos
App.use((0, cors_1.default)());
App.use((0, express_fileupload_1.default)({
    limits: { fileSize: 10 * 1024 * 1024 } // no maximo 10mb
}));
//usando as rotas criadas
App.use(routes_1.route);
// CRIANDO UMA ROTA STATIC PARA ACESSAR ÁS FOTOS SALVAS NO TMP PELO multer
App.use('/file', express_1.default.static(path_1.default.resolve(__dirname, '..', 'tmp')));
//tratando errors
App.use((err, req, res, next) => {
    if (err instanceof Error) {
        //se for uma instancia do tipo erro
        res.status(400).json({ err: err.message });
    }
    return res.status(500).json({
        status: "error",
        message: "internal serve error"
    });
});
//Listando a API na port 3333
App.listen(process.env.PORT, () => console.log("\n\n servidor rodando \n\n"));
