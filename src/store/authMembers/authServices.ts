import { apiClient } from "../../api";
import { AUTHORIZE_PROPS } from "../../utils/types";

const getJdVerificationCase = async (data: AUTHORIZE_PROPS) => {
  const response = await apiClient.post("/get-jd-verfication-case ", data);
  return response;
};

const submitJdPersonVerification = async (data: any) => {
  const response = await apiClient.post("/submit-jd-person-verfication", data);
  return response.data;
};

const authMemberServices = {
  getJdVerificationCase,
  submitJdPersonVerification,
};

export default authMemberServices;
