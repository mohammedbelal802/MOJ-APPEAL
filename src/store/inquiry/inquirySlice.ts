import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import inquiryServices from "./inquiryServices";

interface FILE_PROPS {
  name: string;
  url: string;
  size: string;
}

interface TABLE_PROPS {
  name: string;
  status: string;
  requestType: string;
  requestDate: string;
  files: Array<FILE_PROPS>;
}

interface INITIAL_STATE_PROPS {
  data: {
    caseNumber: string;
    year: string;
    name: string;
    status: string;
    tableData: Array<TABLE_PROPS>;
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

const person = {
  name: "عبدالرحمن عامر العتيبي",
  status: "قاضي",
  tableData: [
    {
      name: "خالد محمد محمود عبد السلام",
      status: "وكيل مدعي عليه",
      requestDate: "٢٠ شوال ١٤٤٤",
      requestType: "طلب نقض",
      files: [
        { name: "ملف-١ ", size: "94 كيلو بايت", url: "" },
        { name: "ملف-٢", size: "94 كيلو بايت", url: "" },
        { name: "ملف-٣", size: "94 كيلو بايت", url: "" },
        { name: "ملف-٤", size: "94 كيلو بايت", url: "" },
        { name: "ملف-٥", size: "94 كيلو بايت", url: "" },
      ],
      authType: "بصمة",
    },
    {
      name: "إبراهيم نور الدين محمد عماد",
      status: "وكيل مدعي عليه",
      requestDate: "٢٠ شوال ١٤٤٤",
      requestType: "طلب نقض",
      files: [{ name: "ملف-١ ", size: "94 كيلو بايت", url: "" }],
      authType: "بصمة",
    },
    {
      name: "يوسف عبدالله محمد البرهامي",
      status: "وكيل مدعي عليه",
      requestDate: "٢٠ شوال ١٤٤٤",
      requestType: "طلب نقض",
      files: [{ name: "ملف-١ ", size: "94 كيلو بايت", url: "" }],
      authType: "توقيع",
    },
    {
      name: "إسماعيل محمد احمد ابراهيم",
      status: "وكيل مدعي عليه",
      requestDate: "٢٠ شوال ١٤٤٤",
      requestType: "طلب نقض",
      files: [{ name: "ملف-١ ", size: "94 كيلو بايت", url: "" }],
      authType: "بصمة",
    },
  ],
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

      return { ...response.data, ...data };
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
