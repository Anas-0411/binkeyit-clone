export const baseUrl = "http://localhost:3000";

const SummaryApis = {
  // User APIs
  register: {
    url: "/api/user/register",
    method: "post",
  },
  login: {
    url: "/api/user/login",
    method: "post",
  },
  forgot_password: {
    url: "/api/user/forgot-password",
    method: "put",
  },
  forgot_password_otp_verification: {
    url: "/api/user/verify-forgot-password-otp",
    method: "put",
  },
  resetPassword: {
    url: "/api/user/reset-password",
    method: "put",
  },
  refreshToken: {
    url: "/api/user/refresh-token",
    method: "post",
  },
  userDetails: {
    url: "/api/user/user-details",
    method: "get",
  },
  logout: {
    url: "/api/user/logout",
    method: "get",
  },
  uploadAvatar: {
    url: "/api/user/upload-avatar",
    method: "put",
  },
  updateProfile: {
    url: "/api/user/update-profile",
    method: "put",
  },
  // File APIs
  uploadImage: {
    url: "/api/file/upload-image",
    method: "post",
  },
  // Category APIs
  addCategory: {
    url: "/api/category/add-category",
    method: "post",
  },
  getCategory: {
    url: "/api/category/get-category",
    method: "get",
  },
  updateCategory: {
    url: "/api/category/update-category",
    method: "put",
  },
  deleteCategory: {
    url: "/api/category/delete-category",
    method: "delete",
  },
  // SubCategory APIs
  createSubCategory: {
    url: "/api/subcategory/add-subCategory",
    method: "post",
  },
  getSubCategory: {
    url: "/api/subcategory/get-subCategory",
    method: "post",
  },
  updateSubcategory: {
    url: "/api/subcategory/update-subCategory",
    method: "put",
  },
  deleteSubCategory: {
    url: "/api/subcategory/delete-subCategory",
    method: "delete",
  },
  // Product APIs
  createProduct: {
    url: "/api/product/create",
    method: "post",
  },
};

export default SummaryApis;
