import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jiDeliveryVerificationServices from "./jiDeliveryServices";
import { warningToast } from "../../utils/toasts";

interface PERSON_PROPS {
  id: number;
  name: string;
  status: string;
  job: string;
}

interface INITIAL_STATE_PROPS {
  data: {
    caseNumber: string;
    year: string;
    name: string;
    status: string;
    instrumentNumber: string;
    persons: Array<PERSON_PROPS>;
    books?: any;
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
    instrumentNumber: "",
    persons: [],
    books: [],
  },
  status: "idle",
  errMsg: "",
};

export const getJiDerliveryVerificationCase = createAsyncThunk(
  "/getJiDeliveryVerificationCase",
  async (
    {
      data,
      navigate,
    }: { data: { caseNumber: string; year: string }; navigate: any },
    thunkApi
  ) => {
    try {
      const response =
        await jiDeliveryVerificationServices.getJideliveryVerificationCase(
          data
        );
      console.log(response);
      navigate("/modal/receive-judgment");
      return { ...response.data, ...data };
    } catch (error: any) {
      warningToast(error?.response?.data?.responseMessage);
      return thunkApi.rejectWithValue(error?.response?.data?.data);
    }
  }
);

export const submitJiDeliveryPersonVerification = createAsyncThunk(
  "/submitJiDeliveryVerification",
  async ({ data }: { data: any }, thunkApi) => {
    try {
      const state: any = thunkApi.getState();
      const verficationCaseData = state.jiDelivery.data;
      const verficationCaseSubmitedData = {
        ...data,
        caseNumber: verficationCaseData.caseNumber,
        year: verficationCaseData.year,
        requestCode: verficationCaseData.requestCode,
      };

      const response =
        await jiDeliveryVerificationServices.submitJiDeliveryVerification(
          verficationCaseSubmitedData
        );

      return response.data;
    } catch (error: any) {
      console.log(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

const jiDeliveryVerificationSlice = createSlice({
  name: "jiDeliveryVerificationSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getJiDerliveryVerificationCase.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        getJiDerliveryVerificationCase.fulfilled,
        (state, action: any) => {
          state.status = "success";
          state.data = action.payload;
        }
      )
      .addCase(
        getJiDerliveryVerificationCase.rejected,
        (state, action: any) => {
          state.status = "error";
          state.errMsg = action.payload || "حدث خطأ ما";
        }
      );
    //   .addCase(receiveJudgment.fulfilled, (state, action: any) => {
    //     state.status = "success";
    //     state.data = action.payload;
    //   })
    //   .addCase(receiveJudgment.rejected, (state, action: any) => {
    //     state.status = "error";
    //     state.errMsg = action.payload || "حدث خطأ ما";
    //   });
  },
});

export default jiDeliveryVerificationSlice.reducer;
