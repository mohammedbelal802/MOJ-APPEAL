import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { successToast, warningToast } from "../../utils/toasts";
import {
  SUBMIT_FINGERPRINT_PROPS,
  VERIFY_FINGERPRINT_PROPS,
} from "../../utils/types";
import verificationCaseServices from "./verificationServices";

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
      };
    });
  },
});

export default verificationCaseSlice.reducer;
