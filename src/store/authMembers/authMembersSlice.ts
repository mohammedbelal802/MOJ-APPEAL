import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AUTHORIZE_PROPS } from "../../utils/types";
import authMemberServices from "./authServices";

interface PERSON_PROPS {
  id: number;
  name: string;
  status: string;
}

interface BOOK {
  bookNo: string;
  url: string;
}

interface INITIAL_STATE_PROPS {
  data: {
    caseNumber: string;
    sessionNumber: string;
    year: string;
    name: string;
    status: string;
    persons: Array<PERSON_PROPS>;
    books: Array<BOOK>;
  };
  status: "idle" | "pending" | "success" | "error";
  errMsg: "";
}

const initialState: INITIAL_STATE_PROPS = {
  data: {
    caseNumber: "",
    sessionNumber: "",
    year: "",
    name: "",
    status: "",
    persons: [],
    books: [
      {
        bookNo: "1",
        url: "sgsg",
      },
      {
        bookNo: "2",
        url: "sgsg",
      },
      {
        bookNo: "3",
        url: "sgsg",
      },
      {
        bookNo: "4",
        url: "sgsg",
      },
      {
        bookNo: "5",
        url: "sgsg",
      },
    ],
  },
  status: "success",
  errMsg: "",
};

export const getJdVerificationCase = createAsyncThunk(
  "/getJdVerificationCase",
  async ({ data }: { data: AUTHORIZE_PROPS }, thunkApi) => {
    try {
      const response = await authMemberServices.getJdVerificationCase(data);
      console.log("this is response   ", response);

      return { ...response.data, ...data };
    } catch (error: any) {
      console.log(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const submitJdPersonVerification = createAsyncThunk(
  "/submitJdVerification",
  async ({ data }: { data: any }, thunkApi) => {
    try {
      const state: any = thunkApi.getState();
      const verficationCaseData = state.authMember.data;
      const verficationCaseSubmitedData = {
        ...data,
        caseNumber: verficationCaseData.caseNumber,
        sessionNumber: verficationCaseData.sessionNumber,
        year: verficationCaseData.year,
      };

      const response = await authMemberServices.submitJdPersonVerification(
        verficationCaseSubmitedData
      );
      console.log(response);

      return response.data;
    } catch (error: any) {
      console.log(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

const authMemberSlice = createSlice({
  name: "authMemeberSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getJdVerificationCase.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getJdVerificationCase.fulfilled, (state, action: any) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getJdVerificationCase.rejected, (state, action: any) => {
        state.status = "error";
        state.errMsg = action.payload || "حدث خطأ ما";
      });
  },
});

export default authMemberSlice.reducer;
