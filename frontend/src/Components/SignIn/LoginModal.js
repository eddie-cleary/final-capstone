import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToken, addUser } from "../../redux/features/auth/authSlice";
import { baseUrl } from "../../shared/baseUrl";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({ username: "", password: "" });

  const handleInputChange = (e) => {
    e.preventDefault();
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    const data = {
      username: state.username,
      password: state.password,
    };

    const userWithToken = await axios.post(baseUrl + "/login", data);

    await dispatch(addToken(userWithToken.data.token));
    await dispatch(addUser(userWithToken.data.user));
  };

  return (
    <div>
      <h1>Please Sign In</h1>
      <label className="sr-only">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        className="form-control"
        placeholder="Username"
        v-model="user.username"
        onChange={handleInputChange}
        required
      />
      <label className="sr-only">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        className="form-control"
        placeholder="Password"
        v-model="user.password"
        onChange={handleInputChange}
        required
      />
      <Link to="/register">Need an account?</Link>
      <Link to="/home">Home</Link>
      <button type="submit" onClick={handleLogin}>
        Sign in
      </button>
    </div>
  );
};

export default Login;
