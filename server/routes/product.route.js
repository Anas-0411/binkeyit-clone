import { Router } from "express";
import auth from "../middlewares/auth.middlewares.js";
import { addProductController } from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.post("/create", auth, addProductController);

export default productRouter;
