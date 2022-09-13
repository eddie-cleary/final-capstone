import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../shared/baseUrl";
import Layout from "../../Layout/Layout";
import MealPlanForm from "../MealPlanForm/MealPlanForm";
import { CircularProgress } from "@mui/material";
import { setMealPlanFormData } from "../../../redux/features/forms/mealplan/mealPlanDataSlice";

const EditMealPlan = () => {
  const currUserId = useSelector((state) => state.auth.user.id);
  const token = useSelector((state) => state.auth.token);
  const { id } = useParams();
  const [mealPlan, setMealPlan] = useState();
  const [isMealPlanLoaded, setIsMealPlanLoaded] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("the meal plan is ", mealPlan);
  }, [mealPlan]);

  useEffect(() => {
    loadMealPlan();
  }, []);

  const loadMealPlan = async () => {
    await axios
      .get(baseUrl + `/mealplans/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setMealPlan(res.data))
      .catch((err) => console.log(err))
      .then(() => setIsMealPlanLoaded(true));
  };

  useEffect(() => {
    if (isMealPlanLoaded && isAuthorized) {
      console.log("setting form data");
      dispatch(setMealPlanFormData(mealPlan));
    }
  }, [isMealPlanLoaded, isAuthorized]);

  useEffect(() => {
    if (isMealPlanLoaded) {
      if (mealPlan?.appUser?.id === currUserId) {
        console.log("authorized");
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    }
  }, [isMealPlanLoaded]);

  return (
    <Layout>
      {!isMealPlanLoaded && <CircularProgress />}
      {isMealPlanLoaded && isAuthorized && <MealPlanForm isEdit={true} />}
    </Layout>
  );
};

export default EditMealPlan;
