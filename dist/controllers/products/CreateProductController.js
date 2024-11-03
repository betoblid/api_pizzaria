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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductController = void 0;
const CreateProductService_1 = require("../../services/product/CreateProductService");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    api_key: process.env.CLOUT_API,
    cloud_name: process.env.CLOUD_NAME,
    api_secret: process.env.CLOUD_SECRET
});
class CreateProductController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { category_id, description, name, price } = req.body;
            const createProductController = new CreateProductService_1.CreateProductService();
            if (!req.files || Object.keys(req.files).length === 0) {
                throw new Error("error upload file image");
            }
            else {
                //pegar a imagem que foi enviada
                const file = req.files['file'];
                //criar uma promisse para subir a imagem e salvar a URL
                const resultFile = yield new Promise((resolve, reject) => {
                    cloudinary_1.v2.uploader.upload_stream({}, function (error, result) {
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve(result);
                    }).end(file.data);
                });
                const NewProduct = yield createProductController.execute({
                    banner: resultFile.url,
                    category_id,
                    description,
                    name,
                    price
                });
                return res.json(NewProduct);
            }
        });
    }
}
exports.CreateProductController = CreateProductController;
