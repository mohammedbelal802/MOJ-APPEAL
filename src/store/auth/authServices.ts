import { apiClient } from "../../api";

interface props {
  username: string;
  password: string;
}

const login = async (data: props) => {
  const response = await apiClient.post("/auth", data);
  return response.data;
};

const authServices = { login };
export default authServices;
