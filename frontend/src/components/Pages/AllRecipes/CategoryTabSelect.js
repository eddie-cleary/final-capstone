import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "@mui/material";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import RecipeCard from "../../shared/RecipeCard";
import {
  setErrorMsg,
  setShowError,
} from "../../../redux/features/forms/errors/errorsSlice";

const CategoryTabSelect = ({ setRecipesToDisplay }) => {
  const token = useSelector((state) => state.auth.token);
  const allRecipes = useSelector((state) => state.recipes.allRecipes);
  const [tabValue, setTabValue] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState("All Recipes");
  const [allCategories, setAllCategories] = useState(["All Recipes"]);
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
        label="All Recipes"
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
      allCategories.map((category, index) => (
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
      if (categoryFilter === "All Recipes") {
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

    const recipesToDisplay = filteredRecipes?.map((recipe) => {
      return <RecipeCard sx={{ m: 3 }} key={recipe.id} recipe={recipe} />;
    });

    setRecipesToDisplay(recipesToDisplay);
  }, [categoryFilter, allCategories, setRecipesToDisplay, allRecipes]);

  const handleChange = (e, newValue) => {
    setTabValue(newValue);
    setCategoryFilter(e.target.textContent);
  };

  return (
    <Tabs
      value={tabValue}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons
      allowScrollButtonsMobile
      aria-label="filter recipes by category"
    >
      {categoryTabs}
    </Tabs>
  );
};

export default CategoryTabSelect;
