import React, { useState, useEffect } from "react";
import Layout from "../../Layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import { baseUrl } from "../../../shared/baseUrl";
import axios from "axios";
import { Typography, Stack, List, Box } from "@mui/material";
import CategoryTabSelect from "./CategoryTabSelect";
import {
  setErrorMsg,
  setShowError,
} from "../../../redux/features/forms/errors/errorsSlice";
import { setAllRecipes } from "../../../redux/features/recipes/recipesDataSlice";

const AllRecipes = () => {
  const token = useSelector((state) => state.auth.token);
  const [recipesToDisplay, setRecipesToDisplay] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(baseUrl + `/recipes/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setAllRecipes(res.data));
      })
      .catch((err) => {
        dispatch(setErrorMsg(err.message));
        dispatch(setShowError(true));
      });
  }, [dispatch, token]);

  return (
    <Layout>
      <Typography variant="h3">All Recipes</Typography>
      <Box sx={{ mt: 3, width: "100%", bgcolor: "background.paper" }}>
        <CategoryTabSelect setRecipesToDisplay={setRecipesToDisplay} />
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
