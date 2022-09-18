import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
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
  CircularProgress,
  useTheme,
} from "@mui/material";
import SingleRecipe from "../../shared/SingleRecipe/SingleRecipe";
import ShoppingList from "../ShoppingList/ShoppingList";
import {
  setShowError,
  setShowSuccess,
  setSuccessMsg,
  setErrorMsg,
} from "../../../redux/features/forms/errors/errorsSlice";
import PageLayout from "../../shared/PageLayout";
import PageTitle from "../../shared/PageTitle";

const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "300px",
  maxWidth: "1200px",
  maxHeight: "90vh",
  height: "100%",
  width: "85vw",
  backgroundColor: "#fff",
  border: "2px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
  alignItems: "center",
  "&::-webkit-scrollbar": {
    display: "none",
  },
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
  backgroundColor: "white",
  padding: "15px",
};

const ViewMealPlan = () => {
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);
  const [mealPlan, setMealPlan] = useState(null);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShoppingList, setShowShoppingList] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BASE_URL + `/mealplans/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setMealPlan(res.data))
      .catch((err) => {
        dispatch(setErrorMsg(err.message));
        dispatch(setShowError(true));
      });
  }, [dispatch, id, token]);

  useEffect(() => {
    console.log("current recipe ", currentRecipe);
    if (currentRecipe?.id != null && currentRecipe?.steps === undefined) {
      axios
        .get(process.env.REACT_APP_BASE_URL + `/recipes/${currentRecipe?.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setCurrentRecipe(res.data))
        .catch((err) => console.log(err));
    }
  }, [currentRecipe, token]);

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
      .delete(process.env.REACT_APP_BASE_URL + `/mealplans/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setSuccessMsg("Meal plan deleted!"));
        dispatch(setShowSuccess(true));
        navigate("/mealplans");
      })
      .catch((err) => {
        dispatch(setErrorMsg(err.message));
        dispatch(setShowError(true));
      })
      .then(() => setIsLoading(false));
  };

  const MealRecipe = ({ mealRecipe }) => {
    return (
      <ListItem>
        <Button
          variant="text-link"
          onClick={() => setCurrentRecipe(mealRecipe.recipe)}
          sx={{ color: theme.palette.primary.dark }}
        >
          {mealRecipe.recipe.name}
        </Button>
      </ListItem>
    );
  };

  const Meal = ({ meal }) => {
    return (
      <ListItem>
        <Stack>
          <Typography variant="h6">{meal.title}</Typography>
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
      <ListItem sx={{ width: "max-content", mb: 8 }}>
        <Stack>
          <Typography variant="h5">{`Day ${index + 1}`}</Typography>
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
      <PageLayout>
        <PageTitle title={mealPlan?.title} />
        <Stack alignItems="center" sx={{ maxWidth: "1100px", width: "100%" }}>
          <Stack
            sx={{ width: "100%", maxWidth: "600px" }}
            direction="row"
            justifyContent="space-between"
          >
            <Box>
              <Link
                sx={{ textDecoration: "none" }}
                to={`/mealplans/edit/${mealPlan?.id}`}
                component={ReactLink}
              >
                <Button variant="btn" sx={{ width: "auto" }}>
                  Edit
                </Button>
              </Link>
              <Button
                onClick={handleDelete}
                color="warning"
                variant="btn-warning"
                sx={{ width: "auto", ml: 2 }}
              >
                {isLoading ? <CircularProgress /> : "Delete"}
              </Button>
            </Box>
            <Button
              onClick={() => setShowShoppingList(true)}
              sx={{ ml: 2 }}
              variant="btn"
            >
              Generate Shopping List
            </Button>
          </Stack>
          <Stack
            direction="row"
            sx={{ mt: 12, width: "100%", flexWrap: "wrap" }}
          >
            {dayComponents}
          </Stack>
        </Stack>
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

        <Modal
          open={showShoppingList}
          keepMounted
          onClose={() => setShowShoppingList(false)}
          aria-labelledby="modal-shoppinglist"
          aria-describedby="modal-shoppinglist"
        >
          <Stack
            sx={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
            style={modalStyles}
          >
            <ShoppingList mealplan={mealPlan} />
          </Stack>
        </Modal>
      </PageLayout>
    </Layout>
  );
};

export default ViewMealPlan;
