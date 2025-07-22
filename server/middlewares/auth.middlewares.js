import jwt  from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken || req?.header?.authorization?.split(" ")[1];
    //console.log("Token:", token);
    if (!token) {
      return res.ststus(401).json({
        message: "Provide Token",
        error: true,
        success: false,
      })
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
    if(!decode) {
      return res.status(401).json({
        message: "You are not authenticated!",
        error: true,
        success: false,
      });
    }
    req.userId = decode.id;
    next();
    // console.log("Decoded Token:", decode);
    
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
};

export default auth;