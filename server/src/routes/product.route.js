import { Router } from "express";

import fileManager from "../util/filemanager.util.js";
import ProductController from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.post("/",
	fileManager.upload.single("file"),
	ProductController.createProduct
);

productRouter.get("/", ProductController.getProducts);
productRouter.get("/:id", ProductController.getProduct);

export default productRouter;
