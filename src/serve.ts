import express, {Request, Response, NextFunction} from "express";
import "express-async-errors"
import cors from "cors";
import { route } from "./routes";
import path from "path"
import fileUpload from "express-fileupload";

//iniciando o express
const App = express();
//declarando que API vai trabalhar no formato JSON
App.use(express.json());
//habilitando a API aceitar request de IPs estranhos
App.use(cors());
App.use(fileUpload({
    limits: {fileSize: 10 * 1024 * 1024} // no maximo 10mb
}))
//usando as rotas criadas
App.use(route)

// CRIANDO UMA ROTA STATIC PARA ACESSAR ÁS FOTOS SALVAS NO TMP PELO multer
App.use(
    '/file',
    express.static(path.resolve(__dirname, '..', 'tmp'))
)
//proteção da rota
App.use((req: Request, res: Response, next: NextFunction) => {

    console.log("API CONSUMIDA!!");
    next();
});

//tratando errors
App.use((err: Error, req: Request, res: Response, next: NextFunction) => {

    if(err instanceof Error){
        //se for uma instancia do tipo erro
        res.status(400).json({err: err.message})
    }

    return res.status(500).json({
        status: "error",
        message: "internal serve error"
    })
})

//Listando a API na port 3333
App.listen(process.env.PORT ,() => console.log("\n\n servidor rodando \n\n"));