import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../../shared/baseUrl";
import { useSelector, useDispatch } from "react-redux";
import { Stack, Typography, TextField, Button, Modal } from "@mui/material";
import { showModalRegister } from "../../redux/features/auth/authSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalRegister = () => {
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const isModalRegister = useSelector((state) => state.auth.isModalRegister);
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
      open={isModalRegister}
      onClose={() => dispatch(showModalRegister(false))}
      aria-labelledby="modal-register"
      aria-describedby="modal-register"
    >
      <Stack sx={style}>
        <Typography variant="h3">Create Account</Typography>
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
          <Button variant="contained" onClick={handleSubmit}>
            Create Account
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default ModalRegister;
