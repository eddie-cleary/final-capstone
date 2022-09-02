import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../shared/baseUrl";
import { useSelector, useDispatch } from "react-redux";
import { Stack, Typography, TextField, Button, Modal } from "@mui/material";
import { showRegisterModal } from "../../redux/features/login/loginSlice";

const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const isRegisterModal = useSelector((state) => state.login.isRegisterModal);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    e.preventDefault();
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const data = {
      username: registerForm.username,
      password: registerForm.password,
      confirmPassword: registerForm.confirmPassword,
      role: "USER",
    };
    if (registerForm.password == registerForm.confirmPassword) {
      axios.post(baseUrl + "/register", data);
    } else {
      alert("Password and Confirm password must match");
    }
  };

  return (
    <Modal
      open={isRegisterModal}
      onClose={() => dispatch(showRegisterModal(false))}
      aria-labelledby="modal-register"
      aria-describedby="modal-register"
    >
      <Stack>
        <Typography variant="h1">Create Account</Typography>
        <TextField
          name="username"
          onChange={handleInputChange}
          label="Username"
          required
        />
        <TextField
          name="password"
          onChange={handleInputChange}
          label="Password"
          required
        />
        <TextField
          name="confirmPassword"
          onChange={handleInputChange}
          label="Confirm Password"
          required
        />
        <Stack direction="row">
          <Link to="/login">Have an account?</Link>
          <Button variant="contained" onClick={handleSubmit}>
            Create Account
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default Register;
