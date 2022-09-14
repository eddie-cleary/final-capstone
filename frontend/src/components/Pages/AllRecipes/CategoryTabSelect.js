import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../../shared/baseUrl";
import { useSelector } from "react-redux";
import RecipeCard from "../../shared/RecipeCard";

const CategoryTabSelect = ({ setRecipesToDisplay, allRecipes }) => {
  const token = useSelector((state) => state.auth.token);
  const [tabValue, setTabValue] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [allCategories, setAllCategories] = useState(["All"]);
  const [categoryTabs, setCategoryTabs] = useState(null);

  useEffect(() => {
    axios
      .get(baseUrl + `/category`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setAllCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let availableTabs = [<Tab key="99" label="All" />];

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
      } else {
        return recipe.recipeCategory.some(
          (recipeCategory) => recipeCategory.name === categoryFilter
        );
      }
    });

    const recipesToDisplay = filteredRecipes?.map((recipe) => {
      return <RecipeCard sx={{ m: 3 }} key={recipe.id} recipe={recipe} />;
    });

    setRecipesToDisplay(recipesToDisplay);
  }, [categoryFilter]);

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
