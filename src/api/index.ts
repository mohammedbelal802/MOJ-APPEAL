import axios from "axios";
import baseURL from "./baseUrl";
const { globalUrl: url } = baseURL();

export const apiClient = axios.create({
  baseURL: `${url}`,
  withCredentials: false,
  headers: {
    Accept: "*",
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSMDAzMDAwMTAxIiwiYXVkaWVuY2UiOiJ1bmtub3duIiwiY3JlYXRlZCI6MTcyNTk2NjQ3NjI1MSwiZXhwIjoxNzI2NTcxMjc2fQ.Qt5RLe5-kwdOpYCJ8Imwko2hIxrpSKkSlHkTgCv7w_sW7rsKNQUowfteVFxXfp9Bqyg68vbJXFsenW18a9VKxQ",
  },
});

apiClient.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const status = error.response ? error.response.responseCode : null;
    if (status === 401) {
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
