import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import SingleRecipe from "../../shared/SingleRecipe/SingleRecipe";
import {
  setShowError,
  setErrorMsg,
} from "../../../redux/features/forms/errors/errorsSlice";
import PageLayout from "../../shared/PageLayout";

const ViewRecipe = () => {
  const token = useSelector((state) => state.auth.token);
  const { id } = useParams();
  const [recipe, setRecipe] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BASE_URL + `/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRecipe(res.data);
      })
      .catch((err) => {
        dispatch(setErrorMsg(err.message));
        dispatch(setShowError(true));
      });
  }, [dispatch, id, token]);

  return (
    <Layout>
      <PageLayout>
        <SingleRecipe recipe={recipe} />
      </PageLayout>
    </Layout>
  );
};

export default ViewRecipe;
