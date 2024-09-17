import axios from "axios";
import baseURL from "./baseUrl";
const { globalUrl: url } = baseURL();

export const apiClient = axios.create({
  baseURL: `${url}`,
  withCredentials: false,
  headers: {
    Accept: "*",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const status = error.response.status;
    const errMsg = error.response.data.error;
    console.log(error);

    if (status === 401 && errMsg === "Unauthorized") {
      window.localStorage.removeItem("user");
      window.location.replace("/login");
      return;
    }
    throw error;
  }
);

export const apiClientForm = axios.create({
  baseURL: `${url}`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
});
