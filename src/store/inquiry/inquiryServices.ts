import { apiClient } from "../../api";

const getSubmitedCaseRequests = async (data: {
  caseNumber: string;
  year: string;
}) => {
  const response = await apiClient.post("/get-submited-case-requests", data);
  return response.data;
};

const inquiryServices = { getSubmitedCaseRequests };
export default inquiryServices;
