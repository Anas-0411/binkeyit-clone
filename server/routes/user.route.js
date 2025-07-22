import { Router } from "express";

// importing modules
import {
  forgotPasswordController,
  loginUserController,
  logoutUserController,
  refreshTokenController,
  registerUserController,
  resetPasswordController,
  updateUserProfileController,
  uploadUserAvatarController,
  verifyEmailController,
  verifyForgotPasswordOtpController,
} from "../controllers/user.controller.js";
import auth from "../middlewares/auth.middlewares.js";
import upload from "../middlewares/multer.js";

// creating a router
const userRouter = Router();

// user routes
userRouter.post("/register", registerUserController);
userRouter.post("/verify_email", verifyEmailController);
userRouter.post("/login", loginUserController);
userRouter.get("/logout", auth, logoutUserController);
userRouter.put(
  "/upload-avatar",
  auth,
  upload.single("avatar"),
  uploadUserAvatarController
);
userRouter.put("/update-profile", auth, updateUserProfileController);
userRouter.put("/forgot-password", forgotPasswordController);
userRouter.put("/verify-forget-password-otp", verifyForgotPasswordOtpController);
userRouter.put("/reset-password", resetPasswordController)
userRouter.post("/refresh-token", refreshTokenController)

export default userRouter;
