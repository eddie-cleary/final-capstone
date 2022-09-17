import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Box,
  Typography,
  Divider,
  FormControl,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../../shared/baseUrl";
import { addToken, addUser } from "../../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import {
  setShowError,
  setErrorMsg,
} from "../../../redux/features/forms/errors/errorsSlice";

const Login = ({ setShowCreateAccount }) => {
  const theme = useTheme();
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
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

    axios
      .post(baseUrl + "/login", data)
      .then((res) => {
        setLoginForm({
          username: "",
          password: "",
        });
        dispatch(addToken(res.data.token));
        dispatch(addUser(res.data.user));
        navigate("/home");
      })
      .catch((err) => {
        if (!err?.response) {
          dispatch(setErrorMsg("No server response"));
        } else if (err.response?.data?.message === "Bad credentials") {
          dispatch(setErrorMsg("Invalid username or password"));
        } else {
          dispatch(setErrorMsg("Login Failed"));
        }
        dispatch(setShowError(true));
      });
  };

  return (
    <>
      <Box sx={{ width: "min-content" }}>
        <Typography variant="h3" element="h1">
          Login
        </Typography>
        <Divider
          sx={{
            height: "5px",
            mt: 1,
            background: `${theme.palette.primary.main}`,
          }}
        />
      </Box>
      <Stack>
        <FormControl sx={{ mt: 5 }}>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            onChange={handleInputChange}
            autoComplete="off"
            name="username"
          ></TextField>
        </FormControl>
        <FormControl sx={{ mt: 5 }}>
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            name="password"
            type="password"
            onChange={handleInputChange}
            autoComplete="off"
            onKeyDown={handleKeyDown}
          ></TextField>
        </FormControl>
        <FormControl sx={{ mt: 5 }}>
          <Button
            onClick={handleLogin}
            variant="btn"
            sx={{ p: 1.5, textTransform: "capitalize" }}
          >
            Login
          </Button>
        </FormControl>
        <Typography sx={{ alignSelf: "center", mt: 2 }}>
          <Button
            onClick={() => setShowCreateAccount(true)}
            variant="text-link"
          >
            Create a new account?
          </Button>
        </Typography>
      </Stack>
    </>
  );
};

export default Login;
