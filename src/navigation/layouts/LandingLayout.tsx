import Header from "../../components/Header";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Landing from "../../pages/Landing";
import { useAppSelector } from "../../store/hooks";

export default function LandingLayout() {
  const { isAuth } = useAppSelector((state) => state.auth);

  // if (!isAuth) {
  //   return <Navigate to={"/login"} />;
  // }
  return (
    <>
      <Header />
      <Landing />
      <Outlet />
    </>
  );
}
