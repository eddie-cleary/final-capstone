import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";
import Main from "./components/Pages/Main/Main";
import Home from "./components/Pages/Home/Home";
import Recipes from "./components/Pages/Recipes/Recipes";
import MealPlans from "./components/Pages/MealPlans/MealPlans";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToken } from "./redux/features/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(addToken(token));
  }, []);

  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/mealplans" element={<MealPlans />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="*" element={<Home />} />
      </Route>
      <Route path="*" element={<Main />} />
    </Routes>
  );
}

export default App;
