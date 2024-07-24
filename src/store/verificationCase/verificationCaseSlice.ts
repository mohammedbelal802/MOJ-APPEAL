import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { successToast, warningToast } from "../../utils/toasts";
import {
  SUBMIT_FINGERPRINT_PROPS,
  VERIFY_FINGERPRINT_PROPS,
} from "../../utils/types";
import verificationCaseServices from "./verificationServices";
import { hide } from "../modal/modalSlice";

interface PERSON {
  id: number;
  job: string;
  name: string;
  status: string;
}
interface FINGERPRINT_CASE_DATA {
  persons: Array<PERSON>;
  sessionId: string;
  status: string;
  reportURL: string;
}

interface INITIAL_STATE_props {
  status: "idle" | "success" | "error" | "pending";
  data: FINGERPRINT_CASE_DATA;
}

const INITIAL_STATE: INITIAL_STATE_props = {
  status: "idle",
  data: { persons: [], sessionId: "", status: "", reportURL: "" },
};

export const getVerificationCase = createAsyncThunk(
  "/get-verifiaction-case",
  async (
    {
      data,
      navigate,
    }: {
      data: { year: string; sessionNumber: string; caseNumber: string };
      navigate: any;
    },

    thunkApi
  ) => {
    try {
      const response = await verificationCaseServices.getVerificationCase(data);
      successToast(response.responseMessage);
      navigate("/modal/authorization");
      return response.data;
    } catch (error: any) {
      warningToast(error?.response?.data?.responseMessage);
      return thunkApi.rejectWithValue(error?.response?.data?.data);
    }
  }
);


export const generateQrCode = createAsyncThunk("/generate-qr",async ({data}:{data:any},thunkApi) =>{
  try {    
    const response = await verificationCaseServices.generateQrCode(data);
    
    return  response.data
  } catch (error:any) {
  return thunkApi.rejectWithValue(error?.response?.data?.data)
  }
})

export const submitVerification = createAsyncThunk("/submit-verification",async ({data}:{data:any},thunkApi) =>{
  try {
      const state:any =thunkApi.getState();
      const verficationCaseData = state.verificationCase.data;
      const verficationCaseSubmitedData = {...data,caseNumber:verficationCaseData.caseNumber,sessionNumber:verficationCaseData.sessionId,year:verficationCaseData.year}

      console.log(verficationCaseSubmitedData);
      
      
    const response = await verificationCaseServices.submitVerification(verficationCaseSubmitedData);
    successToast(response.responseMessage);
    thunkApi.dispatch(hide());
    return  true
  } catch (error:any) {
    warningToast(error?.response?.data?.responseMessage)
  return thunkApi.rejectWithValue(error?.response?.data?.responseMessage)
  }
})

const verificationCaseSlice = createSlice({
  name: "verificationCase",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getVerificationCase.fulfilled, (state, action) => {
      state.status = "success";
      state.data = {
        ...action.payload,
        year: action.meta.arg.data.year,
        caseNumber: action.meta.arg.data.caseNumber,
        sessionId:action.meta.arg.data.sessionNumber
      };
    });
  },
});

export default verificationCaseSlice.reducer;
