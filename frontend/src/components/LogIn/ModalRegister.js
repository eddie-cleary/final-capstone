import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { baseUrl } from "../../shared/baseUrl";
import { useSelector, useDispatch } from "react-redux";
import {
  Stack,
  Typography,
  TextField,
  Button,
  Modal,
  FormControl,
} from "@mui/material";
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

const USER_REGEX = /^[a-z0-9_-]{4,15}$/;
const PWD_REGEX = /^(?=.*?[a-z])(?=.*?[0-9]).{8,18}$/;

const ModalRegister = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [usernameValid, setUsernameValid] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [usernameColor, setUsernameColor] = useState("");

  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [passwordColor, setPasswordColor] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
  const [confirmPasswordColor, setConfirmPasswordColor] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

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
    setErrMsg("");
  }, [username, password, confirmPassword]);

  // Allow form to submit when pressing enter
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const data = {
      username: username,
      password: password,
    };
    if (password === confirmPassword) {
      axios.post(baseUrl + "/register", data);
    } else {
      alert("Password and Confirm password must match");
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
      <Stack sx={style}>
        <TextField ref={errRef} aria-live="assertive">
          {errMsg}{" "}
        </TextField>
        <Typography variant="h3">Create Account</Typography>
        <form>
          <Stack>
            <FormControl>
              <TextField
                inputRef={userRef}
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                label="Username"
                id="username"
                helperText={usernameValid ? " " : "3-15 characters"}
                color={usernameColor}
                required
                autoComplete="off"
                aria-invalid={usernameValid ? "false" : "true"}
              ></TextField>
            </FormControl>
            <FormControl sx={{ mt: 1 }}>
              <TextField
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                type="password"
                id="password"
                helperText={
                  passwordValid
                    ? " "
                    : "8-18 characters 1 lowercase 1 uppercase 1 number"
                }
                color={passwordColor}
                required
                aria-invalid={passwordValid ? "false" : "true"}
              ></TextField>
            </FormControl>
            <FormControl sx={{ mt: 1 }}>
              <TextField
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                helperText={
                  confirmPasswordValid
                    ? " "
                    : "8-18 characters 1 lowercase 1 uppercase 1 number"
                }
                color={confirmPasswordColor}
                required
                aria-invalid={confirmPasswordValid ? "false" : "true"}
              ></TextField>
            </FormControl>
          </Stack>
        </form>
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
