import { Stack, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  showModalLogin,
  showModalRegister,
} from "../../../redux/features/auth/authSlice";
import ModalLogin from "../../LogIn/ModalLogin";
import ModalRegister from "../../LogIn/ModalRegister";
import Features from "./Features";
import Footer from "../../Layout/Footer";
import Header from "../../Layout/Header";

const btn = {
  position: 'static',
  margin: 'auto',
  background: 'radial-gradient(rgb(56, 81, 112) 0%, rgb(20, 45, 76) 97%)',
  width: '20%',
};

const Main = () => {
  const dispatch = useDispatch();

  return (
    <Stack>
     <Header/>

      <Features />
      <Stack direction="row">
        <Button
          onClick={() => dispatch(showModalLogin(true))}
          variant="contained"
          sx={ btn }
        >
          Login
        </Button>
        <Button
          onClick={() => dispatch(showModalRegister(true))}
          variant="contained"
          sx={ btn }
        >
          Register
        </Button>
      </Stack>
      <ModalLogin />
      <ModalRegister />
      <Footer />
    </Stack>
  );
};

export default Main;
