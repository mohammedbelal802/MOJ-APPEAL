import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fingerPrintServices from "./fingerPrintServices";
import { successToast, warningToast } from "../../utils/toasts";
import {
  SUBMIT_FINGERPRINT_PROPS,
  VERIFY_FINGERPRINT_PROPS,
} from "../../utils/types";

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
}

interface INITIAL_STATE_props {
  status: "idle" | "success" | "error" | "pending";
  data: FINGERPRINT_CASE_DATA;
}

const INITIAL_STATE: INITIAL_STATE_props = {
  status: "idle",
  data: { persons: [], sessionId: "", status: "" },
};

export const getFingerPrintCase = createAsyncThunk(
  "/get-fingerprint-case",
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
      const response = await fingerPrintServices.getFingerPrintCase(data);
      successToast(response.responseMessage);
      navigate("/modal/fingerprint");
      return response.data;
    } catch (error: any) {
      warningToast(error?.response?.data?.responseMessage);
      return thunkApi.rejectWithValue(error?.response?.data?.data);
    }
  }
);

export const verifyFingerPrint = createAsyncThunk(
  "/verifyFingerPrint",
  async ({ data }: { data: VERIFY_FINGERPRINT_PROPS }, thunkApi) => {
    try {
      const state: any = thunkApi.getState();
      const fingerPrintCaseData = state.fingerPrintCase.data;
      console.log(fingerPrintCaseData);

      const response = await fingerPrintServices.verifyFingerPrint(data);
      if (response.responseCode === 200)
        thunkApi.dispatch(
          submitFingerPrint({
            data: {
              sessionNumber: fingerPrintCaseData.sessionId,
              caseNumber: fingerPrintCaseData.sessionId,
              id: data.Parameters.id,
              status: fingerPrintCaseData.status,
              year: fingerPrintCaseData.year,
            },
          })
        );

      return response.data;
    } catch (error: any) {
      warningToast(error?.response?.data?.responseMessage);
      return thunkApi.rejectWithValue(error?.response?.data?.responseMessage);
    }
  }
);

export const submitFingerPrint = createAsyncThunk(
  "/submitFingerPrint",
  async ({ data }: { data: SUBMIT_FINGERPRINT_PROPS }, thunkApi) => {
    try {
      const response = await fingerPrintServices.submitFingerPrint(data);

      return response.data;
    } catch (error: any) {
      warningToast(error?.response?.data?.responseMessage);
      return thunkApi.rejectWithValue(error?.response?.data?.responseMessage);
    }
  }
);

const fingerPrintSlice = createSlice({
  name: "fingerprint",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFingerPrintCase.fulfilled, (state, action) => {
      state.status = "success";
      state.data = {
        ...action.payload,
        year: action.meta.arg.data.year,
        caseNumber: action.meta.arg.data.caseNumber,
      };
    });
  },
});

export default fingerPrintSlice.reducer;
