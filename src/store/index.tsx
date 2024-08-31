import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modal/modalSlice";
import fingerPrintSlice from "./fingerprint/fingerPrintSlice";
import authSlice from "./auth/authSlice";
import fingerPrintCaseSlice from "./fingerPrintVerification/fingerPrintCaseSlice";
import verificationCaseSlice from "./verificationCase/verificationCaseSlice";
import authMembersSlice from "./authMembers/authMembersSlice";
import judgmentSlice from "./judgment/judgmentSlice";
import inquirySlice from "./inquiry/inquirySlice";
import SubmitRequestSlice from "./request/SubmitRequestSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    modal: modalSlice,
    fingerPrint: fingerPrintSlice,
    fingerPrintCase: fingerPrintCaseSlice,
    verificationCase: verificationCaseSlice,
    authMember: authMembersSlice,
    judgment: judgmentSlice,
    inquiry: inquirySlice,
    submitRequest: SubmitRequestSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
