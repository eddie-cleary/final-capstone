import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { baseUrl } from "../../shared/baseUrl";
import { useSelector, useDispatch } from "react-redux";
import {
  Stack,
  Typography,
  TextField,
  Modal,
  FormControl,
} from "@mui/material";
import {
  showModalRegister,
  showModalLogin,
} from "../../redux/features/auth/authSlice";
import { CustomButton } from "../..";

const modalStyle = {
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

const USER_REGEX = /^[a-zA-Z0-9_-]{4,15}$/;
const PWD_REGEX = /^(?=.*?[a-zA-Z])(?=.*?[0-9]).{8,18}$/;

const ModalRegister = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [usernameValid, setUsernameValid] = useState(false);
  const [usernameColor, setUsernameColor] = useState("");

  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordColor, setPasswordColor] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [confirmPasswordColor, setConfirmPasswordColor] = useState("");

  const [validForm, setValidForm] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const isModalRegister = useSelector((state) => state.auth.isModalRegister);
  const dispatch = useDispatch();

  useEffect(() => {
    // When modal is shown, and if not undefined, set focus.
    if (isModalRegister) {
      userRef.current.focus();
    }
  }, [isModalRegister]);

  useEffect(() => {
    const result = USER_REGEX.test(username);
    setUsernameValid(result);
  }, [username]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setPasswordValid(result);
  }, [password]);

  useEffect(() => {
    const result = PWD_REGEX.test(confirmPassword);
    setConfirmPasswordValid(result);
  }, [confirmPassword]);

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
    if (usernameValid) {
      setUsernameColor("success");
    } else if (!username) {
      setUsernameColor("");
    } else {
      setUsernameColor("warning");
    }
  }, [username, usernameValid]);

  useEffect(() => {
    if (passwordValid) {
      setPasswordColor("success");
    } else if (!password) {
      setPasswordColor("");
    } else {
      setPasswordColor("warning");
    }
  }, [password, passwordValid]);

  useEffect(() => {
    if (confirmPasswordValid) {
      setConfirmPasswordColor("success");
    } else if (!confirmPassword) {
      setConfirmPasswordColor("");
    } else {
      setConfirmPasswordColor("warning");
    }
  }, [confirmPassword, confirmPasswordValid]);

  useEffect(() => {
    if (passwordValid && confirmPasswordValid) {
      if (password === confirmPassword) {
        setErrMsg(" ");
      } else {
        console.log("setting err msg");
        setErrMsg("Passwords do not match");
      }
    } else {
      setErrMsg("");
    }
  }, [password, confirmPassword, passwordValid, confirmPasswordValid]);

  // Allow form to submit when pressing enter
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
      setErrMsg("Invalid Entry");
      return;
    }
    if (password === confirmPassword) {
      await axios
        .post(baseUrl + "/register", data)
        .then((res) => {
          setSuccessMsg("Success!");
          setUsername("");
          setPassword("");
          setConfirmPassword("");
          setTimeout(() => {
            dispatch(showModalRegister(false));
            dispatch(showModalLogin(true));
            setSuccessMsg("");
          }, 1000);
        })
        .catch((err) => {
          if (!err?.response) {
            setErrMsg("No server response");
          } else if (err.response.data.message === "User Already Exists.") {
            setErrMsg("Username taken");
          } else {
            console.log(err.response.data);
            setErrMsg("Registration Failed");
          }
          errRef.current.focus();
        });
    } else {
      setErrMsg("Password and Confirm password must match");
    }
  };

  return (
    <Modal
      open={isModalRegister}
      keepMounted
      onClose={() => dispatch(showModalRegister(false))}
      aria-labelledby="modal-register"
      aria-describedby="modal-register"
    >
      <Stack sx={modalStyle}>
        <Typography variant="h4">Create Account</Typography>
        <Typography
          sx={{ color: "red", height: "20px" }}
          ref={errRef}
          aria-live="assertive"
        >
          {errMsg}
        </Typography>
        <Typography sx={{ color: "green" }} aria-live="assertive">
          {successMsg}
        </Typography>
        <form>
          <Stack>
            <FormControl sx={{ mt: 2 }}>
              <TextField
                inputRef={userRef}
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                label="Username"
                id="username"
                helperText={
                  usernameValid ? " " : "4-15 characters no special symbols"
                }
                color={usernameColor}
                required
                autoComplete="off"
                aria-invalid={usernameValid ? "false" : "true"}
              ></TextField>
            </FormControl>
            <FormControl sx={{ mt: 2 }}>
              <TextField
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
                value={password}
                helperText={
                  passwordValid
                    ? " "
                    : "8-18 characters 1 lowercase 1 uppercase 1 number"
                }
                color={passwordColor}
                required
                onKeyDown={handleKeyDown}
                aria-invalid={passwordValid ? "false" : "true"}
              ></TextField>
            </FormControl>
            <FormControl sx={{ mt: 2 }}>
              <TextField
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                autoComplete="off"
                value={confirmPassword}
                helperText={
                  confirmPasswordValid
                    ? " "
                    : "8-18 characters 1 lowercase 1 uppercase 1 number"
                }
                color={confirmPasswordColor}
                required
                onKeyDown={handleKeyDown}
                aria-invalid={confirmPasswordValid ? "false" : "true"}
              ></TextField>
            </FormControl>
          </Stack>
        </form>
        <Stack direction="row" sx={{ mt: 2 }}>
          <CustomButton
            disabled={validForm ? false : true}
            variant="contained"
            onClick={handleSubmit}
          >
            Create Account
          </CustomButton>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default ModalRegister;
