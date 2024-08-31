import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import PageLoader from "../components/common/PageLoader";
import CheckModalLayout from "./layouts/CheckModalLayout";
import ModalLayout from "./layouts/ModalLayout";
import FingerPrintVerificationPopup from "../pages/FingerPrintVerificationPopup";
import AuthLayout from "./layouts/AuthLayout";
import FingerPrintVerification from "../pages/FingerPrintVerification";
import AuthorizationPopup from "../pages/AuthorizationPopup";
import Authorization from "../pages/Authorization";
import CaseIdPopup from "../pages/CaseIdPopup";
import SubmitRequest from "../pages/SubmitRequest";
import ChangePasswordPopup from "../pages/ChangePasswordPopup";
import ReceiveJudgmentPopup from "../pages/ReceiveJudgmentPopup";
import ReceiveJudgment from "../pages/ReceiveJudgment";

const Landing = lazy(() => import("./layouts/LandingLayout"));
const Login = lazy(() => import("../pages/Login"));
const Judgment = lazy(() => import("../pages/Judgment"));
const Inquiry = lazy(() => import("../pages/Inquiry"));
const AuthorizeMembers = lazy(() => import("../pages/AuthorizeMembers"));
export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={<PageLoader />}>
        <AuthLayout />
      </Suspense>
    ),
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/members",
    element: <AuthorizeMembers />,
  },
  {
    path: "/judgment",
    element: <Judgment />,
  },
  {
    path: "/inquiry",
    element: <Inquiry />,
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Landing />
      </Suspense>
    ),

    children: [
      {
        path: "/popup",
        element: <CheckModalLayout />,
        children: [
          {
            path: "/popup/fingerprint",
            element: <FingerPrintVerificationPopup />,
          },
          {
            path: "/popup/authorization",
            element: <AuthorizationPopup />,
          },
          {
            path: "/popup/caseid",
            element: <CaseIdPopup />,
          },
          {
            path: "/popup/change-password",
            element: <ChangePasswordPopup />,
          },
          {
            path: "/popup/receive-judgment",
            element: <ReceiveJudgmentPopup />,
          },
        ],
      },
      {
        path: "/modal",
        element: <ModalLayout />,
        children: [
          {
            path: "/modal/fingerprint",
            element: <FingerPrintVerification />,
          },
          {
            path: "/modal/authorization",
            element: <Authorization />,
          },
          {
            path: "/modal/submit-request",
            element: <SubmitRequest />,
          },
          {
            path: "/modal/receive-judgment",
            element: <ReceiveJudgment />,
          },
        ],
      },
    ],
  },
]);
