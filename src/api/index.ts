import axios from "axios";
import baseURL from "./baseUrl";
const { globalUrl: url } = baseURL();

export const apiClient = axios.create({
  baseURL: `${url}`,
  withCredentials: false,
  headers: {
    // Accept: "application/json",
    "Content-Type": "application/json",
  },
});
export const apiClientForm = axios.create({
  baseURL: `${url}`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
});
