import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../shared/baseUrl";
import { useSelector } from "react-redux";
import Layout from "../../Layout/Layout";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import {
  Typography,
  ListItem,
  Button,
  Link,
  List,
  Stack,
  Modal,
  Box,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import SingleRecipe from "../../shared/SingleRecipe/SingleRecipe";

const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "300px",
  maxWidth: "1200px",
  maxHeight: "90vh",
  width: "85vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  backgroundColor: "#fff",
  padding: "15px",
};

const ViewMealPlan = () => {
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);
  const [mealPlan, setMealPlan] = useState(null);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [showError, setShowError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(baseUrl + `/mealplans/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setMealPlan(res.data))
      .catch((err) => console.log(err.response));
  }, []);

  useEffect(() => {
    if (currentRecipe) {
      setShowRecipeModal(true);
    }
  }, [currentRecipe]);

  const handleCloseModal = () => {
    setShowRecipeModal(false);
    setCurrentRecipe(null);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setShowDeleteModal(true);
    return;
  };

  const deleteMealPlan = () => {
    setIsLoading(true);
    axios
      .delete(baseUrl + `/mealplans/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSuccessMsg("Meal plan deleted!");
        setShowSuccess(true);
        navigate("/mealplans");
      })
      .catch((err) => {
        setErrMsg(`${err.response}`);
        setShowError(true);
      })
      .then(() => setIsLoading(false));
  };

  const MealRecipe = ({ mealRecipe }) => {
    return (
      <ListItem>
        <Button onClick={() => setCurrentRecipe(mealRecipe.recipe)}>
          <Typography sx={{ textTransform: "capitalize" }}>
            {mealRecipe.recipe.title}
          </Typography>
        </Button>
      </ListItem>
    );
  };

  const Meal = ({ meal }) => {
    return (
      <ListItem>
        <Stack>
          <Typography>{meal.title}</Typography>
          <List>
            {meal.mealRecipes.map((mealRecipe, index) => {
              return <MealRecipe key={index} mealRecipe={mealRecipe} />;
            })}
          </List>
        </Stack>
      </ListItem>
    );
  };

  const Day = ({ day, index }) => {
    return (
      <ListItem>
        <Stack>
          <Typography>{`Day ${index + 1}`}</Typography>
          <List>
            {day.meals.map((meal, index) => (
              <Meal key={index} meal={meal} />
            ))}
          </List>
        </Stack>
      </ListItem>
    );
  };

  const dayComponents = mealPlan?.days?.map((day, index) => (
    <Day key={index} day={day} index={index} />
  ));

  return (
    <Layout>
      <Box>
        <Link to={`/mealplans/edit/${mealPlan?.id}`} component={ReactLink}>
          <Button variant="contained" sx={{ width: "auto" }}>
            Edit Meal Plan
          </Button>
        </Link>
        <Button
          onClick={handleDelete}
          color="warning"
          variant="contained"
          sx={{ width: "auto", ml: 2 }}
        >
          {isLoading ? <CircularProgress /> : "Delete Meal Plan"}
        </Button>
      </Box>
      <Stack sx={{ mt: 4 }}>{dayComponents}</Stack>
      <Modal keepMounted open={showRecipeModal} onClose={handleCloseModal}>
        <Stack sx={modalStyles}>
          <SingleRecipe recipe={currentRecipe} />
        </Stack>
      </Modal>

      <Modal
        open={showDeleteModal}
        keepMounted
        onClose={() => setShowDeleteModal(false)}
        aria-labelledby="modal-register"
        aria-describedby="modal-register"
      >
        <Box style={modalStyle}>
          <form>
            <Stack alignItems="center">
              <Typography
                sx={{ textAlign: "center" }}
              >{`Are you sure you want to delete mealplan: ${mealPlan?.title}?`}</Typography>
              <Stack direction="row" sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  sx={{ ml: 2 }}
                  variant="contained"
                  onClick={deleteMealPlan}
                  color="warning"
                >
                  Delete
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Modal>

      <Snackbar
        open={showSuccess}
        autoHideDuration={5000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMsg}
        </Alert>
      </Snackbar>
      <Snackbar
        open={showError}
        autoHideDuration={5000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setShowError(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errMsg}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default ViewMealPlan;
