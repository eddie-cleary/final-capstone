import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../../shared/baseUrl";
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
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [allCategories, setAllCategories] = useState(["All"]);
  const [categoryTabs, setCategoryTabs] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(baseUrl + `/category`, {
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
      <Tab key="99" label="All" />,
      <Tab key="98" label="Liked" />,
    ];

    availableTabs.push(
      allCategories.map((category, index) => (
        <Tab key={index} label={category.name} />
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
    });

    console.log("filtered recipes ", filteredRecipes);

    const recipesToDisplay = filteredRecipes?.map((recipe) => {
      return <RecipeCard sx={{ m: 3 }} key={recipe.id} recipe={recipe} />;
    });

    console.log("setting recipes to ", recipesToDisplay);

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
