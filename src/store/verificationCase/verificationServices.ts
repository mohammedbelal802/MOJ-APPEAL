import { apiClient } from "../../api";
import {
  SUBMIT_FINGERPRINT_PROPS,
  VERIFY_FINGERPRINT_PROPS,
} from "../../utils/types";

const getVerificationCase = async (data: {
  year: string;
  sessionNumber: string;
  caseNumber: string;
}) => {
  const response = await apiClient.post("/get-verfication-case", data);
  return response.data;
};


const generateQrCode = async (data:any) =>{
  const response = await apiClient.post("/generate-qr",data);
  return response.data
}

const submitVerification = async (data:any) => {
  const response =await apiClient.post("/submit-verfication",data);
  return response.data;
}

const getVerificationCaseServices = {
  getVerificationCase,
  generateQrCode,
  submitVerification
};

export default getVerificationCaseServices;
