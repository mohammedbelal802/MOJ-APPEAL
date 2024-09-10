import { apiClient, apiClientForm } from "../../api";

const getSubmitCaseParties = async (data: {
  year: string;
  caseNumber: string;
}) => {
  const response = await apiClient.post("/get-submit-case-partie", data);
  return response.data;
};

const submitCasePartiesRequest = async (data: any) => {
  const response = await apiClientForm.post(
    "/submit-case-parties-request",
    data
  );
  return response.data;
};

const submitRequestServices = {
  getSubmitCaseParties,
  submitCasePartiesRequest,
};

export default submitRequestServices;
