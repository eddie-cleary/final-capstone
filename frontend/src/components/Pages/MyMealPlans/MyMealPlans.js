import React, { useState, useEffect } from "react";
import Layout from "../../Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../shared/baseUrl";
import { useSelector, useDispatch } from "react-redux";
import { Stack } from "@mui/material";
import MyMealPlanCard from "../../shared/MyMealPlanCard";
import thumbnail from "./Thumbnail/white-thumbnail.png";
import {
  setShowError,
  setErrorMsg,
} from "../../../redux/features/forms/errors/errorsSlice";
import PageLayout from "../../shared/PageLayout";
import PageTitle from "../../shared/PageTitle";

const MyMealPlans = () => {
  const token = useSelector((state) => state.auth.token);
  const [mealPlans, setMealPlans] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(baseUrl + `/mealplans`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setMealPlans(res.data))
      .catch((err) => {
        dispatch(setErrorMsg(err.message));
        dispatch(setShowError(true));
      });
  }, [token, dispatch]);

  const myMealPlans = mealPlans.map((mealPlan, index) => {
    return (
      <MyMealPlanCard
        title={mealPlan.title}
        id={mealPlan.id}
        bgImg={`${thumbnail}`}
        key={index}
      />
    );
  });

  return (
    <Layout>
      <PageLayout>
        <PageTitle title="My Meal Plans" />
        <Stack direction="row" sx={{ flexWrap: "wrap", gap: "20px" }}>
          {myMealPlans}
        </Stack>
      </PageLayout>
    </Layout>
  );
};

export default MyMealPlans;
