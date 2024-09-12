import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import inquiryServices from "./inquiryServices";
import { INQUIRY_TABLE_PROPS } from "../../utils/types";


interface INITIAL_STATE_PROPS {
  data: {
    caseNumber: string;
    year: string;
    name: string;
    status: string;
    tableData: Array<INQUIRY_TABLE_PROPS>;
  };
  status: "idle" | "pending" | "success" | "error";
  errMsg: "";
}

const initialState: INITIAL_STATE_PROPS = {
  data: {
    caseNumber: "",
    year: "",
    name: "",
    status: "",
    tableData: [],
  },
  status: "idle",
  errMsg: "",
};

export const getSubmitedCaseRequests = createAsyncThunk(
  "/getSubmitedCaseRequests",
  async (
    { data }: { data: { caseNumber: string; year: string } },
    thunkApi
  ) => {
    try {
      const response = await inquiryServices.getSubmitedCaseRequests(data);
      console.log(response);

      return {tableData: response.data, ...data };
    } catch (error: any) {
      console.log(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const inquirySlice = createSlice({
  name: "inquirySlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubmitedCaseRequests.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getSubmitedCaseRequests.fulfilled, (state, action: any) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getSubmitedCaseRequests.rejected, (state, action: any) => {
        state.status = "error";
        state.errMsg = action.payload || "حدث خطأ ما";
      });
  },
});

export default inquirySlice.reducer;
