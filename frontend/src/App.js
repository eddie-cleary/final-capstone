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
import getAppUserFromToken from "./shared/getAppUserFromToken";
import { addUser } from "./redux/features/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  async function loadUser(token) {
    if (token !== "null") {
      const user = await getAppUserFromToken(token)
        .then((res) => res)
        .catch((err) => console.log(err));
      await dispatch(addUser(user));
      await dispatch(addToken(token));
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadUser(token);
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
