import { addToken, deleteUser } from "../../../redux/features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../Layout/Layout";

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    console.log("logout called");
    await dispatch(addToken(""));
    await dispatch(deleteUser());
    console.log("logout done");
  };

  return (
    <Layout>
      <h1>Home component</h1>
    </Layout>
  );
};

export default Home;
