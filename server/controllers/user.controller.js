import sendEmail from "../config/sendEmail.js";
import UserModel from "../models/user.model.js";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import userImageCloudinary from "../utils/uploadImageCloudinary.js";
import generateOpt from "../utils/generateOtp.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";

export async function registerUserController(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Provide email, name, and password",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User is already registered",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = new UserModel({
      name,
      email,
      password: hashPassword,
    });

    const save = await newUser.save();

    const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save._id}`;
    await sendEmail({
      sendTo: email,
      subject: "Verify email from Binkeyit",
      html: verifyEmailTemplate({ name, url: VerifyEmailUrl }),
    });

    return res.status(201).json({
      message: "User registered successfully",
      error: false,
      success: true,
      data: { id: save._id, name: save.name, email: save.email },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
}

// verifing email
export async function verifyEmailController(req, res) {
  try {
    const { code } = req.body;
    const user = await UserModel.findOne({ _id: code });
    if (!user) {
      return res.status(400).json({
        message: "Invalid code",
        error: true,
        success: false,
      });
    }
    const updateUser = await UserModel.updateOne(
      { _id: code },
      {
        verify_email: true,
      }
    );
    return res.json({
      message: "Email verifiction done",
      success: true,
      error: false,
      data: updateUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
}

// login controller
export async function loginUserController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Provide email and password",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not registered!",
        error: true,
        success: false,
      });
    }

    if (user.status !== "Active") {
      return res.status(400).json({
        message: "Contact to Admin account is inactive!",
        error: true,
        success: false,
      });
    }

    const checkPassword = await bcryptjs.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        message: "Check your password!",
        error: true,
        success: false,
      });
    }

    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    // Store the refresh token in DB
    await UserModel.findByIdAndUpdate(user._id, {
      refresh_token: refreshToken,
    });

    const cookieOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", accessToken, cookieOption);
    res.cookie("refreshToken", refreshToken, cookieOption);

    return res.json({
      message: "Login Successfully!",
      success: true,
      error: false,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
}

//logout controller
export async function logoutUserController(req, res) {
  try {
    const userId = req.userId; // make sure this is set by jwtAuthMiddleware

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    // Clear cookies
    res.clearCookie("accessToken", cookiesOption);
    res.clearCookie("refreshToken", cookiesOption);

    // Remove refresh token from DB
    await UserModel.findByIdAndUpdate(userId, {
      refresh_token: "",
    });

    return res.json({
      message: "Logout Successfully!",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
}

// upload user avatar controller
export async function uploadUserAvatarController(req, res) {
  try {
    const userId = req.userId; // make sure this is set by jwtAuthMiddleware
    const image = req.file; // multer will handle the file upload
    const uploadImage = await userImageCloudinary(image);
    const updateUser = await UserModel.findByIdAndUpdate(userId, {
      avatar: uploadImage.url,
    });
    return res.json({
      message: "Avatar uploaded successfully",
      success: true,
      error: false,
      data: {
        _id: userId,
        avatar: uploadImage.url,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
}

// update user profile controller
export async function updateUserProfileController(req, res) {
  try {
    const userId = req.userId;
    const { name, email, password, mobile } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (mobile) updateData.mobile = mobile;
    if (password) updateData.password = await bcryptjs.hash(password, 10);

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: "No data provided to update",
        success: false,
        error: true,
      });
    }

    await UserModel.findByIdAndUpdate(userId, updateData);

    return res.json({
      message: "User profile updated successfully",
      success: true,
      error: false,
      updatedFields: updateData, // Only return updated fields
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
}

// forgot password controller
export async function forgotPasswordController(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "Provide email",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not registered!",
        error: true,
        success: false,
      });
    }

    // Generate otp
    const otp = generateOpt();
    const expireTime = Date.now() + 3600000; // 1 hour from now
    const update = await UserModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forgot_password_expiry: new Date(expireTime).toISOString(),
    });

    // Send reset password email
    await sendEmail({
      sendTo: email,
      subject: "Reset Password from Binkeyit",
      html: forgotPasswordTemplate({
        name: user.name,
        opt: otp,
      }),
    });

    return res.json({
      message: "Reset password otp sent to your email",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
}

// verify forgot password otp
export async function verifyForgotPasswordOtpController(req, res) {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({
        message: "Provide email and otp",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not registered!",
        error: true,
        success: false,
      });
    }

    const currentTime = new Date().toISOString();
    if (user.forgot_password_expiry < currentTime) {
      return res.status(400).json({
        message: "Expired OTP",
        error: true,
        success: false,
      });
    }

    if (user.forgot_password_otp !== otp) {
      return res.status(400).json({
        message: "Incorrect OTP",
        error: true,
        success: false,
      });
    }

    return res.json({
      message: "OTP verified successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
}

// reset password controller
export async function resetPasswordController(req, res) {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "Provide email and new password",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not registered!",
        error: true,
        success: false,
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
        error: true,
        success: false,
      });
    }

    // Hash the new password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(newPassword, salt);

    // Update the user's password
    await UserModel.findByIdAndUpdate(user._id, {
      password: hashPassword,
      forgot_password_otp: null,
      forgot_password_expiry: null,
    });

    return res.json({
      message: "Password reset successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
}

// refresh token controller
export async function refreshTokenController(req, res) {
  try {
    const { refreshToken } =
      req.cookies || req?.header?.authorization?.split("")[1];
    if (!refreshToken) {
      return res.status(401).json({
        message: "No refresh token provided",
        error: true,
        success: false,
      });
    }
    // console.log("Refresh Token:", refreshToken);

    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN
    );

    if (!verifyToken) {
      return res.status(401).json({
        message: "Expired refresh token",
        error: true,
        success: false,
      });
    }
    // console.log("Verified Token:", verifyToken);

    // Generate new access token
    const userId = verifyToken._Id;
    const newAccessToken = await generateAccessToken(userId);

    const cookieOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.cookie("accessToken", newAccessToken, cookieOption);

    return res.json({
      message: "Tokens refreshed successfully",
      success: true,
      error: false,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
}
