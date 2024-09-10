import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { successToast, warningToast } from "../../utils/toasts";
import submitRequestServices from "./submitRequestServices";

interface PERSON {
  id: number;
  job: string;
  name: string;
}
interface SUBMIT_REQUEST_DATA {
  persons: Array<PERSON>;
  caseNumber: string;
  year: string;
}

interface INITIAL_STATE_props {
  status: "idle" | "success" | "error" | "pending";
  data: SUBMIT_REQUEST_DATA;
}

const INITIAL_STATE: INITIAL_STATE_props = {
  status: "idle",
  data: { persons: [], caseNumber: "", year: "" },
};

export const getSubmitCaseParties = createAsyncThunk(
  "/getSubmitCaseParties",
  async (
    {
      data,
      navigate,
    }: { data: { caseNumber: string; year: string }; navigate: any },
    thunkApi
  ) => {
    try {
      const response = await submitRequestServices.getSubmitCaseParties(data);
      navigate("/modal/submit-request");
      console.log(response);
      return { ...response.data, ...data };
    } catch (error: any) {
      warningToast(error?.response?.data?.responseMessage);
      return thunkApi.rejectWithValue(error?.response?.data?.data);
    }
  }
);

export const submitCasePartiesRequest = createAsyncThunk(
  "/submitCasePartiesRequest",
  async ({ data }: { data: any }, thunkApi) => {
    try {
      const state: any = thunkApi.getState();
      const verficationCaseData = state.submitRequest.data;
      const verficationCaseSubmitedData = {
        ...data,
        caseNumber: verficationCaseData.caseNumber,
        year: verficationCaseData.year,
      };

      console.log(verficationCaseSubmitedData);

      const response = await submitRequestServices.submitCasePartiesRequest(
        verficationCaseSubmitedData
      );
      return { ...response.data, ...data };
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

const submitRequestSlice = createSlice({
  name: "verificationCase",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubmitCaseParties.fulfilled, (state, action: any) => {
      state.status = "success";
      state.data = action.payload;
    });
  },
});

export default submitRequestSlice.reducer;
