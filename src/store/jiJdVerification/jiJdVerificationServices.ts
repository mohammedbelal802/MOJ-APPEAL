import { apiClient } from "../../api";

const getJiJdVerificationCase = async (data: {
  year: string;
  caseNumber: string;
}) => {
  const response = await apiClient.post("/get-ji-jd-verfication-case", data);
  return response.data;
};

const submitJiJdPersonVerification = async (data: any) => {
  const response = await apiClient.post(
    "/submit-ji-jd-person-verfication",
    data
  );
  return response.data;
};

const judgmentServices = {
  getJiJdVerificationCase,
  submitJiJdPersonVerification,
};
export default judgmentServices;
