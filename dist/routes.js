"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const detailUserController_1 = require("./controllers/detailUserController");
const isAuthenticated_1 = require("./middleware/isAuthenticated");
const CreateCategoryController_1 = require("./controllers/category/CreateCategoryController");
const ListCategoryController_1 = require("./controllers/category/ListCategoryController");
const CreateProductController_1 = require("./controllers/products/CreateProductController");
const multer_2 = __importDefault(require("./config/multer"));
const ListCategoryFromProductsController_1 = require("./controllers/products/ListCategoryFromProductsController");
const CreateOrderController_1 = require("./controllers/Order/CreateOrderController");
const DeleteOrderController_1 = require("./controllers/Order/DeleteOrderController");
const AddItemController_1 = require("./controllers/Order/AddItemController");
const DeleteItemController_1 = require("./controllers/Order/DeleteItemController");
const SendOrderController_1 = require("./controllers/Order/SendOrderController");
const ListOrdersController_1 = require("./controllers/Order/ListOrdersController");
const DetailOrderController_1 = require("./controllers/Order/DetailOrderController");
const FinishOrderController_1 = require("./controllers/Order/FinishOrderController");
const route = (0, express_1.Router)();
exports.route = route;
//==PASSANDO PARA MULTER QUE A PASTA QUE SERÁ USADA PARA SALVAR ÁS FOTOS É A TMP NA RAIZ DO PROJETO
const upload = (0, multer_1.default)(multer_2.default.upload("./tmp"));
//rota de criar usuário
route.post("/users", new CreateUserController_1.CreateUserController().handle);
//rota de autenticação de usuário
route.post("/session", new AuthUserController_1.AuthUserController().handle);
//rota de detalhes do usuário
route.get("/me", isAuthenticated_1.isAuthenticated, new detailUserController_1.detailUserController().handler);
//--- ROUTER DE CATEGORIA
route.post("/category", isAuthenticated_1.isAuthenticated, new CreateCategoryController_1.CreateCategoryController().handler);
route.get("/listcategory", isAuthenticated_1.isAuthenticated, new ListCategoryController_1.ListCategoryController().handle);
//ROTAS PRODUTOS
//route.post("/newproduct",isAuthenticated, upload.single("file"), new CreateProductController().handle)
route.post("/newproduct", isAuthenticated_1.isAuthenticated, new CreateProductController_1.CreateProductController().handle); // nova route sem multer
route.get("/category/product", isAuthenticated_1.isAuthenticated, new ListCategoryFromProductsController_1.ListCategoryFromProductsController().handler);
//--ROTAS DE ORDER
route.post("/order", isAuthenticated_1.isAuthenticated, new CreateOrderController_1.CreateOrderController().handler);
route.delete("/order", isAuthenticated_1.isAuthenticated, new DeleteOrderController_1.DeleteOrderController().handler);
route.post("/order/add", isAuthenticated_1.isAuthenticated, new AddItemController_1.AddItemController().handle);
route.delete("/order/remove", isAuthenticated_1.isAuthenticated, new DeleteItemController_1.DeleteItemController().handle);
route.put("/order/send", isAuthenticated_1.isAuthenticated, new SendOrderController_1.SendOrderController().handle);
route.get("/orders", isAuthenticated_1.isAuthenticated, new ListOrdersController_1.ListOrdersController().handle);
route.get("/order/detail", isAuthenticated_1.isAuthenticated, new DetailOrderController_1.DetailOrderController().handle);
route.put("/order/finish", isAuthenticated_1.isAuthenticated, new FinishOrderController_1.FinishOrderController().handle);
