export const baseUrl = "http://localhost:3000";

const SummaryApis = {
  register: {
    url: "/api/user/register",
    method: "post",
  },
  login: {
    url: "/api/user/login",
    method: "post",
  },
};

export default SummaryApis;
