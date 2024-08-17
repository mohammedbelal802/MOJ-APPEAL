import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface INITIAL_STATE_PROPS {
  data: {
    caseNumber: string;
    year: string;
    name: string;
    status: string;
    instrumentNumber: string;
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
  },
  status: "idle",
  errMsg: "",
};

const person = {
  name: "عبدالرحمن عامر العتيبي",
  status: "قاضي",
  instrumentNumber: "32",
};

export const getJudgment = createAsyncThunk(
  "/judgment",
  async (
    { data }: { data: { caseNumber: string; year: string } },
    thunkApi
  ) => {
    try {
      let response = { data: {} };
      if (data.caseNumber === "452460" && data.year === "1445") {
        response.data = { ...data, ...person };
      } else {
        throw new Error(
          "لا يوجد نتائج بحث من فضلك تحقق من رقم القضية، رقم الجلسه، أو التاريخ"
        );
      }
      return response.data;
    } catch (error: any) {
      console.log(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const judgmentSlice = createSlice({
  name: "judgmentSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getJudgment.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getJudgment.fulfilled, (state, action: any) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getJudgment.rejected, (state, action: any) => {
        state.status = "error";
        state.errMsg = action.payload || "حدث خطأ ما";
      });
  },
});

export default judgmentSlice.reducer;
