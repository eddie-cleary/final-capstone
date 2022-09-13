import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../../../shared/baseUrl";
import { useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import SingleRecipe from "../../shared/SingleRecipe/SingleRecipe";

const ViewRecipe = () => {
  const token = useSelector((state) => state.auth.token);
  const { id } = useParams();
  const [recipe, setRecipe] = useState();

  useEffect(() => {
    axios
      .get(baseUrl + `/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRecipe(res.data);
        console.log("the recipe is ", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Layout>
      <SingleRecipe recipe={recipe} />
    </Layout>
  );
};

export default ViewRecipe;
