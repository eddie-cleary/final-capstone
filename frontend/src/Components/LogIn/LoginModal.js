import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToken, addUser } from "../../redux/features/auth/authSlice";
import { baseUrl } from "../../shared/baseUrl";
import axios from "axios";
import { TextField, Modal, Stack, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { showLoginModal } from "../../redux/features/login/loginSlice";

const LoginModal = () => {
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const isLoginModal = useSelector((state) => state.login.isLoginModal);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    e.preventDefault();
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    const data = {
      username: loginForm.username,
      password: loginForm.password,
    };

    const userWithToken = await axios.post(baseUrl + "/login", data);

    await dispatch(addToken(userWithToken.data.token));
    await dispatch(addUser(userWithToken.data.user));
  };

  return (
    <Modal
      open={isLoginModal}
      onClose={() => dispatch(showLoginModal(false))}
      aria-labelledby="modal-login"
      aria-describedby="modal-login"
    >
      <Stack>
        <TextField
          name="username"
          onChange={handleInputChange}
          label="Username"
          variant="outlined"
        />
        <TextField
          name="password"
          onChange={handleInputChange}
          label="Password"
          variant="outlined"
        />
        <Button onClick={handleLogin} variant="contained">
          Login
        </Button>
      </Stack>
    </Modal>
  );
};

export default LoginModal;
