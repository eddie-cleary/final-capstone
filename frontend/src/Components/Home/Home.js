import { Stack, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  showModalLogin,
  showModalRegister,
} from "../../redux/features/auth/authSlice";
import ModalLogin from "../LogIn/ModalLogin";
import ModalRegister from "../LogIn/ModalRegister";

const Home = () => {
  const dispatch = useDispatch();

  return (
    <Stack>
      <Typography variant="h2">This is the landing page</Typography>
      <Stack direction="row">
        <Button
          onClick={() => dispatch(showModalLogin(true))}
          variant="contained"
        >
          Login
        </Button>
        <Button
          onClick={() => dispatch(showModalRegister(true))}
          variant="contained"
        >
          Register
        </Button>
      </Stack>
      <ModalLogin />
      <ModalRegister />
    </Stack>
  );
};

export default Home;
