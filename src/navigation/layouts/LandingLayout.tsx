import Header from "../../components/Header";
import { Outlet } from "react-router-dom";
import Landing from "../../pages/Landing";

export default function LandingLayout() {
  return (
    <>
      <Header />
      <Landing />
      <Outlet />
    </>
  );
}
