import { Router } from "express";
import auth from "./../middlewares/auth.middlewares.js";
import {
  addSubCategoryController,
  deleteSubCategoryController,
  getSubCategoryController,
  updateSubCategoryController,
} from "../controllers/subCategory.controller.js";

const subCategoryRouter = Router();

subCategoryRouter.post("/add-subCategory", auth, addSubCategoryController);
subCategoryRouter.post("/get-subCategory", getSubCategoryController);
subCategoryRouter.put("/update-subCategory", auth, updateSubCategoryController);
subCategoryRouter.delete(
  "/delete-subCategory",
  auth,
  deleteSubCategoryController
);

export default subCategoryRouter;
