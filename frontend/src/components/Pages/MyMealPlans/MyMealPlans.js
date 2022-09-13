import React, { useState, useEffect } from "react";
import Layout from "../../Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../shared/baseUrl";
import { useSelector } from "react-redux";
import { Link as ReactLink } from "react-router-dom";
import { Link, Typography, List, ListItem, Grid } from "@mui/material";
import MyMealPlanCard from "../../shared/MyMealPlanCard";
import thumbnail from "./Thumbnail/white-thumbnail.png"

const MyMealPlans = () => {
  const token = useSelector((state) => state.auth.token);
  const [mealPlans, setMealPlans] = useState([]);

  useEffect(() => {
    console.log("the  meal plans ", mealPlans);
  }, [mealPlans]);

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


  const myMealPlans = mealPlans.map((mealPlan) => {
    return (
      <Link component={ReactLink} to={`/mealplans/${mealPlan.id}`}>
        <MyMealPlanCard title={mealPlan.title} id={mealPlan.id} bgImg={`${thumbnail}`} />
      </Link>
    );
  });

  return (
    <Layout>
      <Grid container
      sx={{ mt: 2, mb: 10}}
      spacing={8}
      justifyContent="center"
      alignItems="space-evenly"
      flexWrap="wrap"
      flexGrow="1"> 
      {myMealPlans}
      </Grid>
    </Layout>
  );
};

export default MyMealPlans;
