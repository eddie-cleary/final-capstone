import { Stack, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  showModalLogin,
  showModalRegister,
} from "../../redux/features/auth/authSlice";
import ModalLogin from "../LogIn/ModalLogin";
import ModalRegister from "../LogIn/ModalRegister";
import './Home.css'
import Features from "./Features";
import Footer from "../Main/Footer"

const Home = () => {
  const dispatch = useDispatch();

  return (
    <Stack>
      <Typography variant="h2">My Digital Meal Planner</Typography>
      
      <Features />
      <Stack direction="row" className="Button-Container">
        <Button
          onClick={() => dispatch(showModalLogin(true))}
          variant="contained"
          className="Button"
        >
          Login
        </Button>
        <Button
          onClick={() => dispatch(showModalRegister(true))}
          variant="contained"
          className="Button"
        >
          Register
        </Button >
      </Stack>
      <ModalLogin />
      <ModalRegister />
      <Footer />
    </Stack>
  );
};

export default Home;
