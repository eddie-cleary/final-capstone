import { Stack } from "@mui/material";
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
import { CustomButton } from "../../..";

const Main = () => {
  const dispatch = useDispatch();

  return (
    <Stack>
      <Header />

      <Features />
      <Stack direction="row">
        <CustomButton
          onClick={() => dispatch(showModalLogin(true))}
          variant="contained"
        >
          Login
        </CustomButton>
        <CustomButton
          onClick={() => dispatch(showModalRegister(true))}
          variant="contained"
        >
          Register
        </CustomButton>
      </Stack>
      <ModalLogin />
      <ModalRegister />
      <Footer />
    </Stack>
  );
};

export default Main;
