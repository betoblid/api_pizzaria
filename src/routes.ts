import {Router} from "express"
import multer from "multer"
import { CreateUserController } from "./controllers/user/CreateUserController"
import { AuthUserController } from "./controllers/user/AuthUserController"
import { detailUserController } from "./controllers/detailUserController"
import { isAuthenticated } from "./middleware/isAuthenticated"
import { CreateCategoryController } from "./controllers/category/CreateCategoryController"
import { ListCategoryController } from "./controllers/category/ListCategoryController"
import { CreateProductController } from "./controllers/products/CreateProductController"

import uploadConfig from "./config/multer"
import { ListCategoryFromProductsController } from "./controllers/products/ListCategoryFromProductsController"
import { CreateOrderController } from "./controllers/Order/CreateOrderController"
import { DeleteOrderController } from "./controllers/Order/DeleteOrderController"
import { AddItemController } from "./controllers/Order/AddItemController"
import { DeleteItemController } from "./controllers/Order/DeleteItemController"
import { SendOrderController } from "./controllers/Order/SendOrderController"
import { ListOrdersController } from "./controllers/Order/ListOrdersController"
import { DetailOrderController } from "./controllers/Order/DetailOrderController"
import { FinishOrderController } from "./controllers/Order/FinishOrderController"

const route = Router()


//==PASSANDO PARA MULTER QUE A PASTA QUE SERÁ USADA PARA SALVAR ÁS FOTOS É A TMP NA RAIZ DO PROJETO
const upload = multer(uploadConfig.upload("./tmp"))
//rota de criar usuário
route.post("/users", new CreateUserController().handle)

//rota de autenticação de usuário
route.post("/session", new AuthUserController().handle)

//rota de detalhes do usuário
route.get("/me", isAuthenticated, new detailUserController().handler)


//--- ROUTER DE CATEGORIA
route.post("/category", isAuthenticated, new CreateCategoryController().handler)

route.get("/listcategory",isAuthenticated , new ListCategoryController().handle)

//ROTAS PRODUTOS
//route.post("/newproduct",isAuthenticated, upload.single("file"), new CreateProductController().handle)
route.post("/newproduct",isAuthenticated, new CreateProductController().handle) // nova route sem multer

route.get("/category/product", isAuthenticated, new ListCategoryFromProductsController().handler)


//--ROTAS DE ORDER
route.post("/order", isAuthenticated, new CreateOrderController().handler)

route.delete("/order", isAuthenticated, new DeleteOrderController().handler)

route.post("/order/add", isAuthenticated, new AddItemController().handle)

route.delete("/order/remove", isAuthenticated, new DeleteItemController().handle)

route.put("/order/send", isAuthenticated, new SendOrderController().handle)

route.get("/orders", isAuthenticated, new ListOrdersController().handle)

route.get("/order/detail", isAuthenticated, new DetailOrderController().handle)

route.put("/order/finish", isAuthenticated, new FinishOrderController().handle)
export { route }