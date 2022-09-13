import React, { useState, useEffect } from "react";
import Layout from "../../Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../shared/baseUrl";
import { useSelector } from "react-redux";
import { Stack } from "@mui/material";
import MyMealPlanCard from "../../shared/MyMealPlanCard";
import thumbnail from "./Thumbnail/white-thumbnail.png";

const MyMealPlans = () => {
  const token = useSelector((state) => state.auth.token);
  const [mealPlans, setMealPlans] = useState([]);

  useEffect(() => {
    axios
      .get(baseUrl + `/mealplans`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setMealPlans(res.data))
      .catch((err) => console.log(err.response));
  }, []);

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
      <Stack direction="row" sx={{ flexWrap: "wrap", gap: "20px" }}>
        {myMealPlans}
      </Stack>
    </Layout>
  );
};

export default MyMealPlans;