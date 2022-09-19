import React, { useState, useEffect } from "react";
import Layout from "../../Layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Stack, List, Box } from "@mui/material";
import CategoryTabSelect from "../../shared/CategoryTabSelect";
import {
  setErrorMsg,
  setShowError,
} from "../../../redux/features/forms/errors/errorsSlice";
import { setAllRecipes } from "../../../redux/features/recipes/recipesDataSlice";
import PageTitle from "../../shared/PageTitle";
import PageLayout from "../../shared/PageLayout";

const AllRecipes = () => {
  const token = useSelector((state) => state.auth.token);
  const [recipesToDisplay, setRecipesToDisplay] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BASE_URL + `/recipes/all`, {
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
          <PageTitle title="All Recipes" />
          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <CategoryTabSelect setRecipesToDisplay={setRecipesToDisplay} />
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

export default AllRecipes;
