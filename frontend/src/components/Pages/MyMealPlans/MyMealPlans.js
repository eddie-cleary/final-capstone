import React, { useState, useEffect } from "react";
import Layout from "../../Layout/Layout";
import axios from "axios";
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
import AddMoreContent from "../../shared/AddMoreContent";

const MyMealPlans = () => {
  const token = useSelector((state) => state.auth.token);
  const [mealPlans, setMealPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddLink, setShowAddLink] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + `/mealplans`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setMealPlans(res.data);
        setIsLoading(false);
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
  }, [token, dispatch]);

  useEffect(() => {
    if (!isLoading) {
      if (mealPlans.length === 0) {
        setShowAddLink(true);
      }
    }
  }, [isLoading, mealPlans]);

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
        {showAddLink ? (
          <AddMoreContent content="meal plans" contentLink="/mealplans/add" />
        ) : (
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: "20px" }}>
            {myMealPlans}
          </Stack>
        )}
      </PageLayout>
    </Layout>
  );
};

export default MyMealPlans;
