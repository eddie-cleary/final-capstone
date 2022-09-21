import React, { useState, useEffect, useRef } from "react";
import {
  Stack,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Button,
  Tooltip,
  IconButton,
  Modal,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import servingsIcon from "./icons/servings.png";
import prepIcon from "./icons/prepare.png";
import cookIcon from "./icons/cooking.png";
import { convertToMeasurement } from "../../../shared/conversions";
import {
  AddBox,
  IndeterminateCheckBox,
  Edit,
  Delete,
} from "@mui/icons-material";
import PageTitle from "../PageTitle";
import ReactToPrint from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import ShareButton from "../ShareButton";
import imagePlaceholder from "../../../assets/remade-recipe-placeholder.png";
import TakeoutDiningIcon from "@mui/icons-material/TakeoutDining";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  setShowError,
  setErrorMsg,
  setSuccessMsg,
  setShowSuccess,
} from "../../../redux/features/forms/errors/errorsSlice";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  backgroundColor: "#fff",
  p: 4,
  borderRadius: 3,
  overflow: "hidden",
};

let RenderIngredients = ({ ingredients, currentServings, initialServings }) => {
  const theme = useTheme();

  ingredients?.forEach((ingredient) => {
    const { quantity: quantityTsp, liquid } = ingredient;
    let convertedMeasurement = convertToMeasurement(
      Math.floor(
        Math.floor(quantityTsp * (currentServings / initialServings)) / 6
      ) * 6,
      liquid
    );
    ingredient.text =
      (convertedMeasurement ? convertedMeasurement : "0") +
      " of " +
      ingredient.name;
  });
  return ingredients?.map((ingredient, index) => {
    const isOdd = index % 2 !== 0 ? true : false;

    return (
      <Stack key={index} direction="row" mb={4}>
        <Stack
          sx={{
            backgroundColor: theme.palette.primary.light,
            display: "flex",
            width: "50px",
            height: "50px",
            borderRadius: "25px",
            justifyContent: "center",
            alignItems: "center",
            direction: "row",
            marginLeft: "15px",
          }}
        >
          {ingredient.liquid ? (
            <LocalDrinkIcon />
          ) : (
            <TakeoutDiningIcon sx={{ ml: 2.6, mr: 2.5 }} />
          )}
        </Stack>
        <ListItem
          sx={{
            width: "fit-content",
            minWidth: "50%",
            textAlign: isOdd ? "right" : "left",
          }}
          key={index}
        >
          <ListItemText primary={ingredient.text} />
        </ListItem>
      </Stack>
    );
  });
};

const StepNumber = ({ number }) => {
  const theme = useTheme();

  return (
    <Stack direction="row">
      <Stack
        sx={{
          backgroundColor: theme.palette.primary.light,
          display: "flex",
          width: "50px",
          height: "50px",
          borderRadius: "25px",
          justifyContent: "center",
          alignItems: "center",
          direction: "row",
          marginRight: "15px",
        }}
      >
        {" "}
        <Typography sx={{ fontWeight: "bold" }}>{number}</Typography>
      </Stack>
    </Stack>
  );
};

const RenderSteps = ({ steps }) => {
  let renderedSteps = steps?.map((step, index) => (
    <Box sx={{ display: "flex", mt: 1, alignItems: "center" }}>
      <StepNumber number={index + 1} />
      {` ${step}`}
    </Box>
  ));

  return renderedSteps?.map((step, index) => (
    <ListItem key={index}>
      <ListItemText primary={step} />
    </ListItem>
  ));
};

const InfoCard = (props) => {
  return (
    <Stack direction="column" alignItems="center">
      <Box component="img" src={props.img} alt="prepare icon" width="50px" />
      <Typography variant="h6" component="div">
        <BoldUnderline text={props.name} />
      </Typography>
      {props.showServingsCounter ? (
        <Stack direction="row" alignItems="center">
          <Button
            onClick={() =>
              props.setCurrentServings(
                props.currentServings < 10
                  ? props.currentServings + 1
                  : props.currentServings
              )
            }
            sx={{ p: 0 }}
          >
            <AddBox fontSize="medium" />
          </Button>
          <Typography sx={{ mx: -1 }}>{props.text}</Typography>
          <Button
            onClick={() =>
              props.setCurrentServings(
                props.currentServings > 1
                  ? props.currentServings - 1
                  : props.currentServings
              )
            }
            sx={{ p: 0 }}
          >
            <IndeterminateCheckBox fontSize="medium" />
          </Button>
        </Stack>
      ) : (
        <Typography>{props.text}</Typography>
      )}
    </Stack>
  );
};

const BoldUnderline = ({ text }) => {
  return (
    <Box sx={{ mt: 1 }} fontWeight="fontWeightBold">
      {text}
    </Box>
  );
};

const SingleRecipe = ({ recipe }) => {
  const recipePrepTime = recipe?.prepTime;
  const recipeCookTime = recipe?.cookTime;
  const [currentServings, setCurrentServings] = useState(1);
  const [initialServings, setInitialServings] = useState(1);
  const userId = useSelector((state) => state.auth.user.id);
  const token = useSelector((state) => state.auth.token);
  const isXs = useSelector((state) => state.layout.isXs);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    setShowDeleteModal(true);
    return;
  };

  const handlePostDelete = () => {
    setShowDeleteModal(false);
    axios
      .delete(process.env.REACT_APP_BASE_URL + `/recipes/${recipe.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setSuccessMsg(`Deleted ${recipe.name}!`));
        dispatch(setShowSuccess(true));
        navigate("/myrecipes");
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
  };

  const handleEdit = (e) => {
    e.preventDefault();
    navigate(`/recipes/edit/${recipe.id}`);
  };

  useEffect(() => {
    setCurrentServings(recipe?.servings);
    setInitialServings(recipe?.servings);
  }, [recipe]);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("lg"));

  const printComponent = useRef();

  return (
    <>
      <Box
        sx={{
          "@media print": {
            transform: "scale(0.7)",
            mt: -15,
          },
          width: "100%",
          maxWidth: "800px",
        }}
        ref={printComponent}
      >
        <Stack
          direction="column"
          sx={{
            maxWidth: "800px",
            width: "100%",
          }}
          alignItems="center"
        >
          <PageTitle
            title={recipe?.name}
            sx={{
              "@media print": {
                fontSize: "20px",
              },
            }}
          />
          <Box
            component="img"
            src={
              recipe?.imgId
                ? `https://res.cloudinary.com/djoe/image/upload/c_fill/${recipe?.imgId}.jpg`
                : `${imagePlaceholder}`
            }
            sx={{
              aspectRatio: "1/1",
              width: "100%",
              maxWidth: recipe?.imgId ? "550px" : "350px",
              objectFit: "cover",
              "@media print": {
                display: "none",
              },
            }}
            alt={`Picture of ${recipe?.title}`}
          ></Box>
          <Typography
            sx={{ mt: 1, fontSize: 19 }}
          >{`Shared by ${recipe?.creatorUsername}`}</Typography>
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              mt: 1,
              gap: 2,
              "@media print": {
                display: "none",
              },
            }}
          >
            {recipe?.creatorId === userId && (
              <>
                <Tooltip title="Edit">
                  <IconButton onClick={handleEdit}>
                    <Edit fontSize="small" color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={handleDelete}>
                    <Delete fontSize="small" color="warning" />
                  </IconButton>
                </Tooltip>
              </>
            )}
            <ReactToPrint
              content={() => printComponent.current}
              trigger={() => (
                <IconButton
                  sx={{
                    "@media print": {
                      display: "none",
                    },
                    cursor: "pointer",
                  }}
                >
                  <PrintIcon />
                </IconButton>
              )}
            />
            <ShareButton recipe={recipe} />
          </Stack>
          <Typography sx={{ fontSize: "20px", mt: 2, textAlign: "center" }}>
            {recipe?.description}
          </Typography>
          <Stack
            sx={{
              width: "100%",
              mt: 8,
              gap: "5vw",
              flexWrap: "wrap",
              justifyContent: isXs ? "space-around" : "center",
            }}
            justifyContent="center"
            direction="row"
          >
            <InfoCard
              name="Prep time"
              text={
                Number.parseInt(recipePrepTime) === 1
                  ? "1 minute"
                  : `${recipePrepTime} minutes`
              }
              img={prepIcon}
            />
            <InfoCard
              name="Cook time"
              text={
                Number.parseInt(recipeCookTime) === 1
                  ? "1 minute"
                  : `${recipeCookTime} minutes`
              }
              img={cookIcon}
            />
            <InfoCard
              name="Servings"
              text={currentServings}
              img={servingsIcon}
              setCurrentServings={setCurrentServings}
              showServingsCounter="true"
              currentServings={currentServings}
            />
          </Stack>
        </Stack>
        <Stack
          direction="column"
          sx={{ mt: matches ? 7 : 0, width: "100%", maxWidth: "1000px" }}
        >
          <Stack
            direction="row"
            sx={{
              flexWrap: "wrap",
              justifyContent: "space-between",
              width: "100%",
              mt: 8,
            }}
          >
            <Box>
              <Typography
                sx={{ textAlign: isXs ? "center" : "left" }}
                variant="h5"
              >
                Ingredients
              </Typography>
              <List
                sx={{
                  mt: 5,
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <Stack direction="column" ml={0.5}>
                  <RenderIngredients
                    ingredients={recipe?.recipeIngredients}
                    currentServings={currentServings}
                    initialServings={initialServings}
                  />
                </Stack>
              </List>
            </Box>
          </Stack>
          <Stack sx={{ mt: 2 }} direction="column">
            <Box>
              <Typography
                sx={{ textAlign: isXs ? "center" : "left" }}
                variant="h5"
              >
                Steps
              </Typography>
              <List sx={{ mt: 2, mb: 5 }}>
                <RenderSteps steps={recipe?.steps} />
              </List>
            </Box>
          </Stack>
        </Stack>
      </Box>
      <Modal
        open={showDeleteModal}
        keepMounted
        onClose={() => setShowDeleteModal(false)}
        aria-labelledby="modal-register"
        aria-describedby="modal-register"
      >
        <Box sx={modalStyle}>
          <form>
            <Stack alignItems="center">
              <Typography
                sx={{ textAlign: "center" }}
              >{`Are you sure you want to delete "${recipe?.name}?"`}</Typography>
              <Stack direction="row" sx={{ mt: 4 }}>
                <Button variant="btn" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </Button>
                <Button
                  sx={{ ml: 2 }}
                  variant="btn-warning"
                  onClick={handlePostDelete}
                  color="warning"
                >
                  Delete
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default SingleRecipe;
