import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import RecipeCard from "./RecipeCard";
import MyRecipeCard from "./MyRecipeCard";
import {
  setErrorMsg,
  setShowError,
} from "../../redux/features/forms/errors/errorsSlice";
import RecipeCardAddToMeal from "../Pages/MealPlanForm/RecipeChoices/RecipeCardAddToMeal";

const CategoryTabSelect = ({
  setRecipesToDisplay,
  isMyRecipes,
  isMealRecipes,
  refreshParent,
}) => {
  const token = useSelector((state) => state.auth.token);
  const allRecipes = useSelector((state) => state.recipes.allRecipes);
  const [tabValue, setTabValue] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [allCategories, setAllCategories] = useState(["All"]);
  const [categoryTabs, setCategoryTabs] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BASE_URL + `/category`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setAllCategories(res.data))
      .catch((err) => {
        dispatch(setErrorMsg(err.message));
        dispatch(setShowError(true));
      });
  }, [dispatch, token]);

  useEffect(() => {
    let availableTabs = [
      <Tab
        key="99"
        label="All"
        sx={{
          textTransform: "capitalize",
          letterSpacing: "0.5px",
        }}
      />,
      <Tab
        key="98"
        label="Liked"
        sx={{
          textTransform: "capitalize",
          letterSpacing: "0.5px",
        }}
      />,
    ];

    availableTabs.push(
      allCategories?.map((category, index) => (
        <Tab
          key={index}
          label={category.name}
          sx={{
            textTransform: "capitalize",
            letterSpacing: "0.5px",
          }}
        />
      ))
    );

    setCategoryTabs(availableTabs);
  }, [allCategories]);

  useEffect(() => {
    const filteredRecipes = allRecipes?.filter((recipe) => {
      if (categoryFilter === "All") {
        return true;
      } else if (categoryFilter === "Liked") {
        if (recipe.liked) {
          return true;
        }
      } else {
        return recipe.recipeCategories.some((recipeCategory) => {
          return recipeCategory === categoryFilter;
        });
      }
      return "";
    });

    let recipesToDisplay;

    if (isMyRecipes) {
      recipesToDisplay = filteredRecipes?.map((recipe) => {
        return (
          <MyRecipeCard
            refreshParent={refreshParent}
            sx={{ m: 3 }}
            key={recipe.id}
            recipe={recipe}
          />
        );
      });
    } else if (isMealRecipes) {
      recipesToDisplay = filteredRecipes?.map((recipe, idx) => {
        return <RecipeCardAddToMeal key={idx} recipe={recipe} />;
      });
    } else {
      recipesToDisplay = filteredRecipes?.map((recipe) => {
        return <RecipeCard sx={{ m: 3 }} key={recipe.id} recipe={recipe} />;
      });
    }

    setRecipesToDisplay(recipesToDisplay);
  }, [
    allRecipes,
    categoryFilter,
    isMyRecipes,
    isMealRecipes,
    setRecipesToDisplay,
    refreshParent,
  ]);

  const handleChange = (e, newValue) => {
    setTabValue(newValue);
    setCategoryFilter(e.target.textContent);
  };

  return (
    <Box
      sx={{
        maxWidth: {
          xs: "410px",
          sm: "600px",
          md: "800px",
          lg: "700px",
          xl: "1000px",
        },
        margin: "0 auto",
      }}
    >
      <Tabs
        value={tabValue}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        aria-label="filter recipes by category"
      >
        {categoryTabs}
      </Tabs>
    </Box>
  );
};

export default CategoryTabSelect;
