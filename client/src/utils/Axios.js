import axios from "axios";
import SummaryApis, { baseUrl } from "../common/SummaryApis";

const Axios = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

// 🔹 Interceptor to attach access token to every request
Axios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken"); // ✅ fixed
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🔹 Interceptor to handle 401 and refresh token
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired (401) and retry flag not set yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken"); // ✅ consistent
      if (refreshToken) {
        try {
          const newAccessToken = await refreshAccessToken(refreshToken);
          if (newAccessToken) {
            // Save new token and retry request
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return Axios(originalRequest);
          }
        } catch (err) {
          console.error("Refresh token failed:", err);
        }
      }
    }

    return Promise.reject(error);
  }
);

// 🔹 Helper to refresh access token
const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axios({
      ...SummaryApis.refreshToken, // use normal axios (not Axios) to avoid interceptor loop
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
      withCredentials: true,
    });

    const accessToken = response.data.data.accessToken;
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
};

export default Axios;
