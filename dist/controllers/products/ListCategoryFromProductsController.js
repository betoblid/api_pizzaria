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
exports.ListCategoryFromProductsController = void 0;
const ListCategoryFromProductsService_1 = require("../../services/product/ListCategoryFromProductsService");
class ListCategoryFromProductsController {
    handler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const category_id = req.query.category_id;
            if (!category_id) {
                throw new Error("Id not exist");
            }
            else {
                const FindByProducts = new ListCategoryFromProductsService_1.ListCategoryService();
                const Products = yield FindByProducts.execute({ category_id });
                return res.json(Products);
            }
        });
    }
}
exports.ListCategoryFromProductsController = ListCategoryFromProductsController;
