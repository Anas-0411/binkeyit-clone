import Axios from "./Axios";
import SummaryApis from "../api/SummaryApis";

const uploadImageUtils = async (image, res) => {
  try {
    const formData = new FormData();
    formData.append("image", image);
    const response = await Axios({
      ...SummaryApis.uploadImage,
      data: formData,
    });
    return response;
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
};

export default uploadImageUtils;
