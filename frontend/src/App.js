import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";
import Main from "./components/Pages/Main/Main";
import Home from "./components/Pages/Home/Home";
import ViewRecipe from "./components/Pages/ViewRecipe/ViewRecipe";
import MealPlans from "./components/Pages/MealPlans/MealPlans";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToken } from "./redux/features/auth/authSlice";
import AddRecipe from "./components/Pages/AddRecipe/AddRecipe";
import AllRecipes from "./components/Pages/AllRecipes/AllRecipes";
import MyRecipes from "./components/Pages/MyRecipes/MyRecipes";
import AddIngredient from "./components/Pages/AddIngredient/AddIngredient";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== "null") {
      dispatch(addToken(token));
    }
  }, []);

  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route exact path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mealplans" element={<MealPlans />} />
        <Route path="/recipes" element={<AllRecipes />} />
        <Route path="/ingredient/add" element={<AddIngredient />} />
        <Route path="/recipes/add" element={<AddRecipe />} />
        <Route path="/recipes/:id" element={<ViewRecipe />} />
        <Route path="/myrecipes" element={<MyRecipes />} />s
        <Route path="*" element={<Home />} />
      </Route>
      <Route path="*" element={<Main />} />
    </Routes>
  );
}

export default App;
