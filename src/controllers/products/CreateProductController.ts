import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";
import { UploadedFile } from "express-fileupload";

import {v2 as cloudinary, UploadApiResponse} from 'cloudinary'

cloudinary.config({
    api_key: process.env.CLOUT_API,
    cloud_name: process.env.CLOUD_NAME,
    api_secret: process.env.CLOUD_SECRET
})

class CreateProductController {

    async handle(req: Request, res: Response) {

        const { category_id, description, name, price } = req.body

        const createProductController = new CreateProductService()

        if(!req.files || Object.keys(req.files).length === 0 ) {
            throw new Error("error upload file image")


        } else{

            //pegar a imagem que foi enviada
            const file: UploadedFile = req.files['file']

            //criar uma promisse para subir a imagem e salvar a URL
            const resultFile: UploadApiResponse = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({}, function (error, result) {

                    if(error){
                        reject(error)
                        return;
                    }
                    resolve(result)
                }).end(file.data)
            })


             const NewProduct = await createProductController.execute({
            banner: resultFile.url,
            category_id,
            description,
            name,
            price
        })

        return res.json(NewProduct)
        }
    }
}

export { CreateProductController }