import { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Home from "../Home/Home";
import { addToken, deleteUser } from "../../redux/features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";

const Main = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    console.log("logout called");
    await dispatch(addToken(""));
    await dispatch(deleteUser());
    console.log("logout done");
  };

  useEffect(() => {
    console.log("token is ", token);
    console.log("user is ", user);
  }, [user, token]);

  return (
    <div>
      {token !== undefined ? (
        <div>
          <Link to="/home">Home token working | </Link>
          <Link to="/login" onClick={handleLogout}>
            Logout
          </Link>
        </div>
      ) : (
        <Link to="/login">Home Main | </Link>
      )}
      <Routes>
        <Route exact path="/login" component={() => <Login />} />
        <Route exact path="/register" component={() => <Register />} />
        <Route
          exact
          path="/home"
          component={token !== undefined ? () => <Home /> : null}
        />
      </Routes>
    </div>
  );
};

export default Main;
