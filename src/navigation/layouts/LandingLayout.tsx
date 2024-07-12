import Header from "../../components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import Landing from "../../pages/Landing";
import { useEffect } from "react";
import { useAppSelector } from "../../store/hooks";

export default function LandingLayout() {
  const { isAuth } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);
  return (
    <>
      <Header />
      <Landing />
      <Outlet />
    </>
  );
}
