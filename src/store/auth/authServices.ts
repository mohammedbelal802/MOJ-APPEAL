import { apiClient } from "../../api";

interface props {
  username: string;
  password: string;
}

const login = async (data: props) => {
  const response = await apiClient.post("/auth", data);
  return response.data;
};

const changePassword = async (data: {
  oldPassword: string;
  newPassword: string;
}) => {
  const response = await apiClient.post("/change-password", data);
  return response.data;
};

const authServices = { login, changePassword };
export default authServices;
