import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modal/modalSlice";
import fingerPrintSlice from "./fingerprint/fingerPrintSlice";
import authSlice from "./auth/authSlice";
import fingerPrintCaseSlice from "./fingerPrintVerification/fingerPrintCaseSlice";
import verificationCaseSlice from "./verificationCase/verificationCaseSlice";
import authMembersSlice from "./authMembers/authMembersSlice";
import inquirySlice from "./inquiry/inquirySlice";
import SubmitRequestSlice from "./request/SubmitRequestSlice";
import jiJdVerificationSlice from "./jiJdVerification/jiJdVerificationSlice";
import jiDeliverySlice from "./jiDelivery/jiDeliverySlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    modal: modalSlice,
    fingerPrint: fingerPrintSlice,
    fingerPrintCase: fingerPrintCaseSlice,
    verificationCase: verificationCaseSlice,
    authMember: authMembersSlice,
    jiJdVerification: jiJdVerificationSlice,
    jiDelivery: jiDeliverySlice,
    inquiry: inquirySlice,
    submitRequest: SubmitRequestSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
