import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import Main from "../Pages/Main/Main";
import useAuth from "../../shared/useAuth";

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Main />;
};

export default ProtectedRoutes;
