import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import judgmentServices from "./jiJdVerificationServices";

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

const person = {
  name: "عبدالرحمن عامر العتيبي",
  status: "قاضي",
  instrumentNumber: "32",
};

const persons = [
  {
    name: "عبدالله محمد السيد",
    id: 1,
    status: "test",
  },
  {
    name: "عامر أحمد الفهري",
    id: 2,
    status: "test",
  },
  {
    name: "حسن محروس محمود",
    id: 3,
    status: "test",
  },
  {
    name: "سعد محمد العتيبي",
    id: 4,
    status: "test",
  },
];

export const getJiJdVerificationCase = createAsyncThunk(
  "/getJiJdVerificationCase",
  async (
    { data }: { data: { caseNumber: string; year: string } },
    thunkApi
  ) => {
    try {
      const response = await judgmentServices.getJiJdVerificationCase(data);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const submitJiJdPersonVerification = createAsyncThunk(
  "/submitJiJdVerification",
  async ({ data }: { data: any }, thunkApi) => {
    try {
      const state: any = thunkApi.getState();
      const verficationCaseData = state.verificationCase.data;
      const verficationCaseSubmitedData = {
        ...data,
        caseNumber: verficationCaseData.caseNumber,
        sessionNumber: verficationCaseData.sessionId,
        year: verficationCaseData.year,
        requestCode: verficationCaseData.requestCode,
      };

      const response = await judgmentServices.submitJiJdPersonVerification(
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

export const getJudgment = createAsyncThunk(
  "/judgment",
  async (
    { data }: { data: { caseNumber: string; year: string } },
    thunkApi
  ) => {
    try {
      let response = { data: {} };
      if (data.caseNumber === "452460" && data.year === "1445") {
        response.data = { ...data, ...person, persons };
      } else {
        throw new Error(
          "لا يوجد نتائج بحث من فضلك تحقق من رقم القضية، رقم الجلسة، أو التاريخ"
        );
      }
      return response.data;
    } catch (error: any) {
      console.log(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const receiveJudgment = createAsyncThunk(
  "/judgment/receive",
  async (
    {
      data,
      navigate,
    }: { data: { caseNumber: string; year: string }; navigate: any },
    thunkApi
  ) => {
    try {
      console.log(data.caseNumber);
      console.log(data.year);

      let response = { data: {} };
      if (data.caseNumber === "452460") {
        response.data = {
          ...data,
          ...person,
          persons,
          books: [{ href: "test", label: "عرض صك الحكم" }],
        };
      } else {
        throw new Error(
          "لا يوجد نتائج بحث من فضلك تحقق من رقم القضية، رقم الجلسة، أو التاريخ"
        );
      }

      navigate("/modal/receive-judgment");
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

const JiJdVerificationSlice = createSlice({
  name: "JiJdVerificationSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getJiJdVerificationCase.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getJiJdVerificationCase.fulfilled, (state, action: any) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getJiJdVerificationCase.rejected, (state, action: any) => {
        state.status = "error";
        state.errMsg = action.payload || "حدث خطأ ما";
      })
      .addCase(receiveJudgment.fulfilled, (state, action: any) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(receiveJudgment.rejected, (state, action: any) => {
        state.status = "error";
        state.errMsg = action.payload || "حدث خطأ ما";
      });
  },
});

export default JiJdVerificationSlice.reducer;
