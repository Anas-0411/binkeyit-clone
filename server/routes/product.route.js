import { Router } from "express";
import auth from "../middlewares/auth.middlewares.js";
import {
  addProductController,
  getAllProductsController,
} from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.post("/create", auth, addProductController);
productRouter.post("/getAllProducts", auth, getAllProductsController);

export default productRouter;
