import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import Main from "../Pages/Main/Main";

const useAuth = () => {
  const token = useSelector((state) => state.auth.token);
  return token !== null;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Main />;
};

export default ProtectedRoutes;
