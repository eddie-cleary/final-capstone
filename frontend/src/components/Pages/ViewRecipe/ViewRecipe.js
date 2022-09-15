import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { baseUrl } from "../../../shared/baseUrl";
import { useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import SingleRecipe from "../../shared/SingleRecipe/SingleRecipe";
import {
  setShowError,
  setErrorMsg,
} from "../../../redux/features/forms/errors/errorsSlice";

const ViewRecipe = () => {
  const token = useSelector((state) => state.auth.token);
  const { id } = useParams();
  const [recipe, setRecipe] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(baseUrl + `/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("setting recipe to ", res.data);
        setRecipe(res.data);
      })
      .catch((err) => {
        dispatch(setErrorMsg(err.message));
        dispatch(setShowError(true));
      });
  }, [dispatch, id, token]);

  return (
    <Layout>
      <SingleRecipe recipe={recipe} />
    </Layout>
  );
};

export default ViewRecipe;
