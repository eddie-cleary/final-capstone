import React, { useEffect, useState, useCallback } from "react";
import Layout from "../../Layout/Layout";
import { Stack, Box, List } from "@mui/material";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import CategoryTabSelect from "../../shared/CategoryTabSelect";
import {
  setShowError,
  setErrorMsg,
} from "../../../redux/features/forms/errors/errorsSlice";
import PageTitle from "../../shared/PageTitle";
import PageLayout from "../../shared/PageLayout";
import { setAllRecipes } from "../../../redux/features/recipes/recipesDataSlice";

const MyRecipes = () => {
  const [recipesToDisplay, setRecipesToDisplay] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const loadRecipes = useCallback(() => {
    axios
      .get(process.env.REACT_APP_BASE_URL + `/recipes/myRecipes`, {
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

  useEffect(() => {
    loadRecipes();
  }, [dispatch, token, loadRecipes]);

  return (
    <Layout>
      <PageLayout>
        <Stack
          sx={{
            width: "100%",

            maxWidth: {
              xs: "380px",
              sm: "600px",
              md: "700px",
              lg: "800px",
              xl: "1800px",
            },
          }}
        >
          <PageTitle title="My Recipes" />
          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <CategoryTabSelect
              isMyRecipes={true}
              setRecipesToDisplay={setRecipesToDisplay}
            />
          </Box>
          <List>
            <Stack
              sx={{ mt: 5, justifyContent: "space-evenly" }}
              direction="row"
              flexWrap="wrap"
            >
              {recipesToDisplay}
            </Stack>
          </List>
        </Stack>
      </PageLayout>
    </Layout>
  );
};

export default MyRecipes;
