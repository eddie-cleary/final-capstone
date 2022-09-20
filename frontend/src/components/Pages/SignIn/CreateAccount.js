import React, { useState, useRef, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  Stack,
  Box,
  Typography,
  Divider,
  FormControl,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  setShowError,
  setErrorMsg,
  setSuccessMsg,
  setShowSuccess,
} from "../../../redux/features/forms/errors/errorsSlice";
import axios from "axios";

const CreateAccount = ({ setShowCreateAccount }) => {
  const theme = useTheme();

  const userRef = useRef();
  const errRef = useRef();

  const USER_REGEX = useMemo(() => /^[a-zA-Z0-9_-]{4,15}$/, []);
  const PWD_REGEX = useMemo(() => /^(?=.*?[a-zA-Z])(?=.*?[0-9]).{8,18}$/, []);

  const [username, setUsername] = useState("");
  const [usernameValid, setUsernameValid] = useState(false);
  const [usernameColor, setUsernameColor] = useState("");

  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordColor, setPasswordColor] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [confirmPasswordColor, setConfirmPasswordColor] = useState("");
  const [passwordDontMatch, setPasswordDontMatch] = useState(false);

  const [validForm, setValidForm] = useState(false);

  const dispatch = useDispatch();

  const md = useMediaQuery("(max-width: 1130px)");

  useEffect(() => {
    if (
      passwordValid &&
      confirmPasswordValid &&
      usernameValid &&
      password === confirmPassword
    ) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }, [
    username,
    password,
    confirmPassword,
    confirmPasswordValid,
    passwordValid,
    usernameValid,
  ]);

  useEffect(() => {
    if (password.length >= 4 && confirmPassword.length >= 4) {
      if (password !== confirmPassword) {
        setPasswordDontMatch(true);
        return;
      }
    }
    setPasswordDontMatch(false);
  }, [password, confirmPassword]);

  useEffect(() => {
    const result = USER_REGEX.test(username);
    setUsernameValid(result);
  }, [username, USER_REGEX]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setPasswordValid(result);
  }, [password, PWD_REGEX]);

  useEffect(() => {
    const result = PWD_REGEX.test(confirmPassword);
    setConfirmPasswordValid(result);
  }, [confirmPassword, PWD_REGEX]);

  useEffect(() => {
    if (usernameValid) {
      setUsernameColor("primary");
    } else if (!username) {
      setUsernameColor("");
    } else {
      setUsernameColor("warning");
    }
  }, [username, usernameValid]);

  useEffect(() => {
    if (passwordValid) {
      setPasswordColor("primary");
    } else if (!password) {
      setPasswordColor("");
    } else {
      setPasswordColor("warning");
    }
  }, [password, passwordValid]);

  useEffect(() => {
    if (confirmPasswordValid) {
      setConfirmPasswordColor("primary");
    } else if (!confirmPassword) {
      setConfirmPasswordColor("");
    } else {
      setConfirmPasswordColor("warning");
    }
  }, [confirmPassword, confirmPasswordValid]);

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const data = {
      username: username,
      password: password,
    };
    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2 || !usernameValid) {
      dispatch(setErrorMsg("Invalid Entry"));
      return;
    }
    if (password === confirmPassword) {
      await axios
        .post(process.env.REACT_APP_BASE_URL + "/register", data)
        .then((res) => {
          dispatch(setSuccessMsg("Success!"));
          dispatch(setShowSuccess(true));
          setUsername("");
          setPassword("");
          setConfirmPassword("");
          setShowCreateAccount(false);
        })
        .catch((err) => {
          if (!err?.response) {
            dispatch(setErrorMsg("No server response"));
          } else if (err.response.data.message) {
            dispatch(setErrorMsg(err.response.data.message));
          } else {
            console.log(err.response.data);
            dispatch(setErrorMsg("Registration Failed"));
          }
          dispatch(setShowError(true));
          errRef.current.focus();
        });
    } else {
      dispatch(setErrorMsg("Password and Confirm password must match"));
      dispatch(setShowError(true));
    }
  };

  return (
    <>
      <Box sx={{ width: "min-content" }}>
        <Typography sx={{ fontSize: md ? 40 : 50 }} variant="h3" element="h1">
          Register
        </Typography>
        <Divider
          sx={{
            height: "5px",
            mt: 1,
            background: `${theme.palette.primary.main}`,
          }}
        />
      </Box>
      <Stack sx={{ mt: 4 }}>
        <FormControl>
          <TextField
            inputRef={userRef}
            id="username"
            label="Username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
            value={username}
            helperText={
              usernameValid ? " " : "4-15 lowercase characters & no symbols"
            }
            color={usernameColor}
            required
            autoComplete="off"
            aira-invalid={usernameValid ? "false" : "true"}
          ></TextField>
        </FormControl>
        <FormControl>
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="off"
            value={password}
            helperText={passwordValid ? " " : "8-18 characters 1 number"}
            color={passwordColor}
            required
            onKeyDown={handleKeyDown}
            aria-invalid={passwordValid ? "false" : "true"}
          ></TextField>
        </FormControl>
        <FormControl>
          <TextField
            id="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            autoComplete="off"
            value={confirmPassword}
            helperText={
              passwordDontMatch
                ? "Passwords must match"
                : confirmPasswordValid
                ? " "
                : "8-18 characters 1 number"
            }
            color={confirmPasswordColor}
            required
            onKeyDown={handleKeyDown}
            aria-invalid={confirmPasswordValid ? "false" : "true"}
          ></TextField>
        </FormControl>
        <FormControl>
          <Button
            disabled={validForm ? false : true}
            variant="btn"
            onClick={handleSubmit}
            sx={{ p: 1.5, textTransform: "capitalize" }}
          >
            Create Account
          </Button>
        </FormControl>
        <Typography sx={{ alignSelf: "center", mt: 2 }}>
          <Button
            onClick={() => setShowCreateAccount(false)}
            variant="text-link"
            sx={{ textTransform: "initial" }}
          >
            Already have an account?
          </Button>
        </Typography>
      </Stack>
    </>
  );
};

export default CreateAccount;
