import { apiClient } from "../../api";
import {
  SUBMIT_FINGERPRINT_PROPS,
  VERIFY_FINGERPRINT_PROPS,
} from "../../utils/types";

const getFingerPrintCase = async (data: {
  year: string;
  sessionNumber: string;
  caseNumber: string;
}) => {
  const response = await apiClient.post("/get-fingerprint-case", data);
  return response.data;
};

const verifyFingerPrint = async (data: VERIFY_FINGERPRINT_PROPS) => {
  const response = await apiClient.post("/verify-fingerprint", data);
  return response.data;
};

const submitFingerPrint = async (data: SUBMIT_FINGERPRINT_PROPS) => {
  const response = await apiClient.post("/submit-fingerprint", data);
  return response.data;
};

const fingerPrintCaseServices = {
  getFingerPrintCase,
  verifyFingerPrint,
  submitFingerPrint,
};

export default fingerPrintCaseServices;
