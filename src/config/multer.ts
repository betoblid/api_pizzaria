import crypto from "crypto"
import multer from "multer";


import {extname, resolve} from "path"


//CRIAR UMA FUNCTION PARA RENOMEAR E SALVAR FOTOS NA PASTA TMP DA PROPRÍA API 

export default {
    upload(folder: string) {

        return{
            storage: multer.diskStorage({
                destination: resolve(__dirname, '..', '..', folder),
                filename: (Request, file, callback) => {
                    const fileHash = crypto.randomBytes(16).toString("hex");
                    const fileName = `${fileHash}-${file.originalname}`

                    return callback(null,fileName)
                }
            })
        }
    }
}