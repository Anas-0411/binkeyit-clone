import { Router } from "express";
import uploadImageController from "../controllers/uploadImage.controller.js";
import auth from "./../middlewares/auth.middlewares.js";
import upload from "../middlewares/multer.js";

const uploadRouter = Router();

uploadRouter.post(
  "/upload-image",
  auth,
  upload.single("image"),
  uploadImageController
);

export default uploadRouter;
