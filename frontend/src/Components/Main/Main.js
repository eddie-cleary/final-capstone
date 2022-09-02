import { useEffect } from "react";
import { addToken, deleteUser } from "../../redux/features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";
import AllRecipes from "../Recipes/AllRecipes";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import MealPlans from "../MealPlans/MealPlans";

const Main = () => {
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
    <>
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/recipes" element={<AllRecipes />} />
        <Route path="/mealplans" element={<MealPlans />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Main;
