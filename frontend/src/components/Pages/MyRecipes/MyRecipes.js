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
import AddMoreContent from "../../shared/AddMoreContent";

const MyRecipes = () => {
  const [recipesToDisplay, setRecipesToDisplay] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [isRecipesLoading, setIsRecipesLoading] = useState(true);
  const recipesFound = useSelector((state) => state.recipes.allRecipes);
  const [showAddLink, setShowAddLink] = useState(false);

  const loadRecipes = useCallback(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + `/recipes/myRecipes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setAllRecipes(res.data));
        setIsRecipesLoading(false);
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          dispatch(setErrorMsg(err.response.data.message));
        } else if (err.response?.statusText) {
          dispatch(setErrorMsg(err.response.statusText));
        } else if (err.request) {
          dispatch(setErrorMsg("Network error."));
        } else {
          dispatch(setErrorMsg("Error"));
        }
        dispatch(setShowError(true));
      });
  }, [dispatch, token]);

  useEffect(() => {
    loadRecipes();
  }, [dispatch, token, loadRecipes]);

  useEffect(() => {
    if (!isRecipesLoading) {
      if (recipesFound.length === 0) {
        setShowAddLink(true);
      }
    }
  }, [isRecipesLoading, recipesFound]);

  return (
    <Layout>
      <PageLayout>
        <Stack
          sx={{
            width: "100%",

            maxWidth: {
              xs: "410px",
              sm: "600px",
              md: "800px",
              lg: "1000px",
              xl: "1800px",
            },
          }}
        >
          <PageTitle title="My Recipes" />
          {!showAddLink && (
            <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
              <CategoryTabSelect
                isMyRecipes={true}
                refreshParent={loadRecipes}
                setRecipesToDisplay={setRecipesToDisplay}
              />
            </Box>
          )}
          {showAddLink ? (
            <AddMoreContent content="recipes" contentLink="/addrecipe" />
          ) : (
            <List>
              <Stack
                sx={{ mt: 5, justifyContent: "space-evenly" }}
                direction="row"
                flexWrap="wrap"
              >
                {recipesToDisplay}
              </Stack>
            </List>
          )}
        </Stack>
      </PageLayout>
    </Layout>
  );
};

export default MyRecipes;
