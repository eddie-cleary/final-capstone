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

const btn = {
  justifyContent: "space-evenly",
  marginTop: "10%",
};

const Main = () => {
  const dispatch = useDispatch();

  return (
    <Stack>
      <Typography variant="h2">My Digital Meal Planner</Typography>

      <Features />
      <Stack direction="row" className="Button-Container">
        <Button
          onClick={() => dispatch(showModalLogin(true))}
          variant="contained"
          sx={{ btn }}
        >
          Login
        </Button>
        <Button
          onClick={() => dispatch(showModalRegister(true))}
          variant="contained"
          sx={{ btn }}
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
