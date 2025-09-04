import { Router } from "express";
import CartController from "../controllers/cart.controller.js";
import { authorize } from "../middlewares/authorization.middleware.js";

const cartRouter = Router();

cartRouter.get("/", authorize, CartController.getUserCart);
cartRouter.post("/", authorize, CartController.addProductToCart);
cartRouter.delete("/:productId", authorize, CartController.removeProductFromCart);

export default cartRouter;
