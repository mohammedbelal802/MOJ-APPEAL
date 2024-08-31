import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AUTHORIZE_PROPS } from "../../utils/types";

interface PERSON_PROPS {
  id: number;
  name: string;
  status: string;
}

interface INITIAL_STATE_PROPS {
  data: {
    caseNumber: string;
    sessionNumber: string;
    year: string;
    name: string;
    status: string;
    persons: Array<PERSON_PROPS>;
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
  },
  status: "idle",
  errMsg: "",
};

const person = {
  name: "عبدالرحمن عامر العتيبي",
  status: "قاضي",
  id: 1,
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

export const authorizeMember = createAsyncThunk(
  "/authorizeMember",
  async ({ data }: { data: AUTHORIZE_PROPS }, thunkApi) => {
    try {
      let response = { data: {} };
      if (
        data.caseNumber === "452460" &&
        data.sessionNumber === "3" &&
        data.year === "1445"
      ) {
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

const authMemberSlice = createSlice({
  name: "authMemeberSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authorizeMember.pending, (state) => {
        state.status = "pending";
      })
      .addCase(authorizeMember.fulfilled, (state, action: any) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(authorizeMember.rejected, (state, action: any) => {
        state.status = "error";
        state.errMsg = action.payload || "حدث خطأ ما";
      });
  },
});

export default authMemberSlice.reducer;
