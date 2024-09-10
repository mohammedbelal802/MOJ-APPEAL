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
        requestCode: data.requestCode,
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

export const getRequestData = createAsyncThunk(
  "/get-request-data",
  async (
    {
      data,
      navigate,
    }: {
      data: { year: string; caseId: string };
      navigate: any;
    },

    thunkApi
  ) => {
    try {
      //   const response = await verificationCaseServices.getVerificationCase(data);
      //   successToast(response.responseMessage);
      const response = {
        data: { persons, year: data.year, caseNumber: data.caseId },
      };
      navigate("/modal/authorization");
      return response.data;
    } catch (error: any) {
      warningToast(error?.response?.data?.responseMessage);
      return thunkApi.rejectWithValue(error?.response?.data?.data);
    }
  }
);

// export const generateQrCode = createAsyncThunk(
//   "/generate-qr",
//   async ({ data }: { data: any }, thunkApi) => {
//     try {
//       const response = await verificationCaseServices.generateQrCode(data);
//       return response.data;
//     } catch (error: any) {
//       return thunkApi.rejectWithValue(error?.response?.data?.data);
//     }
//   }
// );

// export const submitVerification = createAsyncThunk(
//   "/submit-verification",
//   async ({ data }: { data: any }, thunkApi) => {
//     try {
//       const state: any = thunkApi.getState();
//       const verficationCaseData = state.verificationCase.data;
//       const verficationCaseSubmitedData = {
//         ...data,
//         caseNumber: verficationCaseData.caseNumber,
//         sessionNumber: verficationCaseData.sessionId,
//         year: verficationCaseData.year,
//       };
//       await verificationCaseServices.submitVerification(
//         verficationCaseSubmitedData
//       );
//       // successToast(response.responseMessage);
//       // thunkApi.dispatch(hide());
//       return true;
//     } catch (error: any) {
//       warningToast(error?.response?.data?.responseMessage);
//       return thunkApi.rejectWithValue(error?.response?.data?.responseMessage);
//     }
//   }
// );

const submitRequestSlices = createSlice({
  name: "verificationCase",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRequestData.fulfilled, (state, action: any) => {
      state.status = "success";
      state.data = action.payload;
    });
  },
});

export default submitRequestSlices.reducer;
