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

const Landing = lazy(() => import("./layouts/LandingLayout"));
const Login = lazy(() => import("../pages/Login"));

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
    path: "/",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Landing />
      </Suspense>
    ),

    children: [
      {
        path: "/check",
        element: <CheckModalLayout />,
        children: [
          {
            path: "/check/fingerprint",
            element: <FingerPrintVerificationPopup />,
          },
          {
            path: "/check/authorization",
            element: <AuthorizationPopup />,
          },
          {
            path: "/check/caseid",
            element: <CaseIdPopup />,
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
        ],
      },
    ],
  },
]);
