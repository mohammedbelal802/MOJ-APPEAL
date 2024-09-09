import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jiDeliveryVerificationServices from "./jiDeliveryServices";

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
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

// export const submitJiJdPersonVerification = createAsyncThunk(
//   "/submitJiJdVerification",
//   async ({ data }: { data: any }, thunkApi) => {
//     try {
//       const state: any = thunkApi.getState();
//       const verficationCaseData = state.verificationCase.data;
//       const verficationCaseSubmitedData = {
//         ...data,
//         caseNumber: verficationCaseData.caseNumber,
//         sessionNumber: verficationCaseData.sessionId,
//         year: verficationCaseData.year,
//         requestCode: verficationCaseData.requestCode,
//       };

//       const response = await judgmentServices.submitJiJdPersonVerification(
//         verficationCaseSubmitedData
//       );
//       console.log(response);

//       return response.data;
//     } catch (error: any) {
//       console.log(error);
//       return thunkApi.rejectWithValue(error);
//     }
//   }
// );

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
