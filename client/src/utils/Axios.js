import axios from "axios";
import SummaryApis, { baseUrl } from "../common/SummaryApis";

const Axios = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

// sending access token to header
Axios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accesstoken", accessToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// extending the life span of access token by using refresh token

Axios.interceptors.request.use(
  (response) => {
    return response;
  },
  async (error) => {
    let originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest.retry) {
      originalRequest.retry = true;
      const refreshToken = localStorage.getItem("refreshtoken");
      if (refreshToken) {
        const newAccessToken = refreshAccessToken(refreshToken);
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return Axios(originalRequest);
        }
      }
    }

    return Promise.reject(error);
  }
);

const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await Axios({
      ...SummaryApis.refreshToken,
      header: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    const accessToken = response.data.data.accessToken;
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    console.log(error);
  }
};

export default Axios;
