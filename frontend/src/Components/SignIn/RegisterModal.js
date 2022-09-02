import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../shared/baseUrl";

const Register = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const data = {
      username: state.username,
      password: state.password,
      confirmPassword: state.confirmPassword,
      role: "USER",
    };
    if (state.password == state.confirmPassword) {
      axios.post(baseUrl + "/register", data);
    } else {
      alert("Password and Confirm password must match");
    }
  };

  return (
    <div>
      <h1>Create Account</h1>
      <label class="sr-only">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        class="form-control"
        placeholder="Username"
        v-model="user.username"
        onChange={handleInputChange}
        required
      />
      <label class="sr-only">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        class="form-control"
        placeholder="Password"
        v-model="user.password"
        onChange={handleInputChange}
        required
      />
      <input
        type="password"
        id="password-confirm"
        name="confirmPassword"
        class="form-control"
        placeholder="Confirm Password"
        v-model="user.password"
        onChange={handleInputChange}
        required
      />
      <Link to="/login">Have an account?</Link>
      <button type="submit" onClick={handleSubmit}>
        Sign in
      </button>
    </div>
  );
};

export default Register;
