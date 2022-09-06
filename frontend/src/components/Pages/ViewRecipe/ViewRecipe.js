import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../../shared/baseUrl";
import { useSelector } from "react-redux";

const SingleRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    axios
      .get(baseUrl + `/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRecipe(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Layout>
      <section>
        <Typography variant="h4">{recipe.title}</Typography>
        <Typography variant="h4">{recipe.description}</Typography>
        <Typography variant="h4">{recipe.servings}</Typography>
      </section>
    </Layout>
  );
};

export default SingleRecipe;
