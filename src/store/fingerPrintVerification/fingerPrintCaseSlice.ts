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
      navigate("/modal/fingerprint");
      return response.data;
    } catch (error: any) {
      warningToast(error?.response?.data?.responseMessage);
      return thunkApi.rejectWithValue(error?.response?.data?.data);
    }
  }
);

export const verifyAndSubmitFingerPrint = createAsyncThunk(
  "/verifyAndSubmitFingerPrint",
  async ({ data }: { data: VERIFY_FINGERPRINT_PROPS }, thunkApi) => {
    const state: any = thunkApi.getState();
    const fingerPrintCaseData = state.fingerPrintCase.data;
    try {
      console.log(fingerPrintCaseData);

      const response = await fingerPrintServices.verifyFingerPrint(data);

      if (response.responseCode === 200)
        await fingerPrintServices.submitFingerPrint({
          sessionId: fingerPrintCaseData.sessionId,
          id: data.Parameters.id,
          status: "10",
        });

      return response.data;
    } catch (error: any) {
      if (error?.response.data.responseCode === 404)
        await fingerPrintServices.submitFingerPrint({
          sessionId: fingerPrintCaseData.sessionId,
          id: data.Parameters.id,
          status: "20",
        });
      return thunkApi.rejectWithValue(error?.response?.data?.responseMessage);
    }
  }
);

export const verifyFingerPrint = createAsyncThunk(
  "/verifyFingerPrint",
  async ({ data }: { data: VERIFY_FINGERPRINT_PROPS }, thunkApi) => {
    try {
      const response = await fingerPrintServices.verifyFingerPrint(data);
      return response.data;
    } catch (error: any) {
      warningToast(error?.response?.data?.responseMessage);
      return thunkApi.rejectWithValue(error?.response?.data?.responseMessage);
    }
  }
);

export const submitFingerPrint = createAsyncThunk(
  "/submitFingerPrint",
  async (
    { data }: { data: { id: string; sessionId: string; status: string } },
    thunkApi
  ) => {
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
  reducers: {
    resetFingerPrintCase: (state) => INITIAL_STATE,
    resetStatus: (state) => ({ ...state, status: "idle" }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFingerPrintCase.fulfilled, (state, action) => {
        state.data = {
          ...action.payload,
          year: action.meta.arg.data.year,
          caseNumber: action.meta.arg.data.caseNumber,
        };
      })
      .addCase(verifyAndSubmitFingerPrint.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(verifyAndSubmitFingerPrint.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { resetFingerPrintCase, resetStatus } = fingerPrintSlice.actions;
export default fingerPrintSlice.reducer;
