import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";
import Home from "./components/Pages/Home/Home";
import ViewRecipe from "./components/Pages/ViewRecipe/ViewRecipe";
import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addToken } from "./redux/features/auth/authSlice";
import AddRecipe from "./components/Pages/AddRecipe/AddRecipe";
import AllRecipes from "./components/Pages/AllRecipes/AllRecipes";
import MyRecipes from "./components/Pages/MyRecipes/MyRecipes";
import EditRecipe from "./components/Pages/EditRecipe/EditRecipe";
import AddIngredient from "./components/Pages/AddIngredient/AddIngredient";
import getAppUserFromToken from "./shared/getAppUserFromToken";
import { addUser } from "./redux/features/auth/authSlice";
import AddMealPlan from "./components/Pages/AddMealPlan/AddMealPlan";
import MyMealPlans from "./components/Pages/MyMealPlans/MyMealPlans";
import ViewMealPlan from "./components/Pages/ViewMealPlan/ViewMealPlan";
import EditMealPlan from "./components/Pages/EditMealPlan/EditMealPlan";
import AddCategory from "./components/Pages/AddCategory/AddCategory";
import { Navigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadUser = useCallback(
    async (token) => {
      if (token !== "null") {
        const user = await getAppUserFromToken(token)
          .then((res) => res)
          .catch((err) => console.log(err));
        await dispatch(addUser(user));
        await dispatch(addToken(token));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadUser(token);
    } else {
      navigate("/");
    }
  }, [loadUser, navigate]);

  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/allrecipes" element={<AllRecipes />} />
        <Route exact path="/mymealplans" element={<MyMealPlans />} />
        <Route exact path="/mealplans/add" element={<AddMealPlan />} />
        <Route exact path="/mealplans/:id" element={<ViewMealPlan />} />
        <Route exact path="/mealplans/edit/:id" element={<EditMealPlan />} />
        <Route exact path="/ingredient/add" element={<AddIngredient />} />
        <Route exact path="/category/add" element={<AddCategory />} />
        <Route exact path="/addrecipe" element={<AddRecipe />} />
        <Route exact path="/recipes/:id" element={<ViewRecipe />} />
        <Route exact path="/recipes/edit/:id" element={<EditRecipe />} />
        <Route exact path="/myrecipes" element={<MyRecipes />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
