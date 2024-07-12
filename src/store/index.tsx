import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modal/modalSlice";
import fingerPrintSlice from "./fingerprint/fingerPrintSlice";
import authSlice from "./auth/authSlice";
import fingerPrintCaseSlice from "./fingerPrintVerification/fingerPrintCaseSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    modal: modalSlice,
    fingerPrint: fingerPrintSlice,
    fingerPrintCase: fingerPrintCaseSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
