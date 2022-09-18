import { Outlet } from "react-router";
import useAuth from "../../shared/useAuth";
import SignIn from "../Pages/SignIn/SignIn";

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <SignIn />;
};

export default ProtectedRoutes;
