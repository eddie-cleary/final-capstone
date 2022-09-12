import React, { useState, useEffect } from "react";
import Layout from "../../Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../shared/baseUrl";
import { useSelector } from "react-redux";
import { Link as ReactLink } from "react-router-dom";
import { Link, Typography, List, ListItem } from "@mui/material";

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

  const MealPlanLink = ({ mealplan }) => {
    return (
      <ListItem>
        <Link component={ReactLink} to={`/mealplans/${mealplan.id}`}>
          <Typography>{mealplan.title}</Typography>
        </Link>
      </ListItem>
    );
  };

  const mealPlanComponents = mealPlans.map((mealplan) => (
    <MealPlanLink key={mealplan.id} mealplan={mealplan} />
  ));

  return (
    <Layout>
      <List>{mealPlanComponents}</List>
    </Layout>
  );
};

export default MyMealPlans;
