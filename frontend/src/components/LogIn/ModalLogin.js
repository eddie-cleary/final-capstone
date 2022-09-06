import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToken, addUser } from "../../redux/features/auth/authSlice";
import { baseUrl } from "../../shared/baseUrl";
import axios from "axios";
import {
  TextField,
  Modal,
  Stack,
  Button,
  Typography,
  FormControl,
} from "@mui/material";
import { useSelector } from "react-redux";
import { showModalLogin } from "../../redux/features/auth/authSlice";
import { Navigate, useNavigate } from "react-router-dom";


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
}
const btn = {
  background: 'radial-gradient(rgb(159, 211, 199) 0%, rgb(56, 81, 112) 100%)',
  color: '#142d4c',
  fontWeight: 'bold',
  marginTop: '1em',
  border: 'solid .5px #142d4c',
  boxShadow: 3,
  "&:hover": {
    boxShadow: 8,
}

};

const ModalLogin = () => {
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [errMsg, setErrMsg] = useState("");
  const isModalLogin = useSelector((state) => state.auth.isModalLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    e.preventDefault();

    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    const data = {
      username: loginForm.username,
      password: loginForm.password,
    };

    try {
      const userWithToken = await axios.post(baseUrl + "/login", data);
      setLoginForm({
        username: "",
        password: "",
      });
      dispatch(showModalLogin(false));
      await dispatch(addToken(userWithToken.data.token));
      await dispatch(addUser(userWithToken.data.user));
      navigate("/mealplans");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 401) {
        setErrMsg("Invalid username or password");
      } else {
        setErrMsg("Registration Failed");
      }
    }
  };

  return (
    <Modal
      open={isModalLogin}
      onClose={() => dispatch(showModalLogin(false))}
      aria-labelledby="modal-login"
      aria-describedby="modal-login"
    >
      <Stack sx={style}>
        <Typography variant="h4">Login</Typography>
        <Typography sx={{ color: "red" }}>{errMsg}</Typography>
        <form>
          <Stack>
            <FormControl sx={{ mt: 2 }}>
              <TextField
                name="username"
                onChange={handleInputChange}
                label="Username"
                variant="outlined"
                autoComplete="off"
              />
            </FormControl>
            <FormControl sx={{ mt: 2 }}>
              <TextField
                name="password"
                type="password"
                onChange={handleInputChange}
                label="Password"
                autoComplete="off"
                variant="outlined"
                onKeyDown={handleKeyDown}
              />
            </FormControl>
          </Stack>
        </form>
        <Button sx={btn} onClick={handleLogin} variant="contained">
          Login
        </Button>
      </Stack>
    </Modal>
  );
};

export default ModalLogin;
