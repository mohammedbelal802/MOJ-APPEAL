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
      const formData = new FormData();
      formData.append("caseNumber", verficationCaseSubmitedData.caseNumber);
      formData.append("year", verficationCaseSubmitedData.year);
      formData.append("id", verficationCaseSubmitedData.id);
      formData.append("userId", verficationCaseSubmitedData.userId);
      formData.append(
        "verificationType",
        verficationCaseSubmitedData.verificationType
      );
      formData.append("requestType", verficationCaseSubmitedData.requestType);
      formData.append(
        "verificationImage",
        verficationCaseSubmitedData.verificationImage
      );
      for (let i = 0; i < verficationCaseSubmitedData.files.length; i++) {
        formData.append("files", verficationCaseSubmitedData.files[i]);
      }

      const response = await submitRequestServices.submitCasePartiesRequest(
        formData
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
