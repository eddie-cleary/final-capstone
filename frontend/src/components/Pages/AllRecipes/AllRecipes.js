import React, { useState, useEffect, RouterLink } from "react";
import Layout from "../../Layout/Layout";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../shared/baseUrl";
import axios from "axios";
import { Typography, Stack, List, Box } from "@mui/material";
import CategoryTabSelect from "./CategoryTabSelect";

const AllRecipes = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const [recipesToDisplay, setRecipesToDisplay] = useState([]);

  useEffect(() => {
    axios
      .get(baseUrl + `/recipes/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAllRecipes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Layout>
      <Typography variant="h3">All Recipes</Typography>
      <Box sx={{ mt: 3, width: "100%", bgcolor: "background.paper" }}>
        <CategoryTabSelect
          setRecipesToDisplay={setRecipesToDisplay}
          allRecipes={allRecipes}
        />
      </Box>
      <List>
        <Stack direction="row" flexWrap="wrap">
          {recipesToDisplay}
        </Stack>
      </List>
    </Layout>
  );
};

export default AllRecipes;
