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
} from "@mui/material";
import { useSelector } from "react-redux";
import servingsIcon from "./icons/servings.png";
import prepIcon from "./icons/prepare.png";
import cookIcon from "./icons/cooking.png";
import { convertToMeasurement } from "../../../shared/conversions";
import { AddBox, IndeterminateCheckBox } from "@mui/icons-material";
import PageTitle from "../PageTitle";
import ReactToPrint from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import ShareButton from "../ShareButton";

let RenderIngredients = ({ ingredients, currentServings }) => {
  let renderedIngredients = ingredients?.map((ingredient) => {
    const { quantity: quantityTsp, liquid } = ingredient;
    let convertedMeasurement = convertToMeasurement(
      quantityTsp * currentServings,
      liquid
    );
    return convertedMeasurement + " of " + ingredient.name;
  });
  return renderedIngredients?.map((ingredient, index) => {
    const isOdd = index % 2 !== 0 ? true : false;

    return (
      <ListItem
        sx={{
          width: "fit-content",
          minWidth: "50%",
          textAlign: isOdd ? "right" : "left",
        }}
        key={index}
      >
        <ListItemText primary={ingredient} />
      </ListItem>
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

  const isXs = useSelector((state) => state.layout.isXs);

  useEffect(() => {
    setCurrentServings(recipe?.servings);
  }, [recipe]);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("lg"));

  const printComponent = useRef();

  return (
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
              : ""
          }
          sx={{
            aspectRatio: "1/1",
            width: "100%",
            maxWidth: "550px",
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
          <ReactToPrint
            content={() => printComponent.current}
            trigger={() => (
              <PrintIcon
                sx={{
                  "@media print": {
                    display: "none",
                  },
                }}
              />
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
                mt: 4,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <RenderIngredients
                ingredients={recipe?.recipeIngredients}
                currentServings={currentServings}
              />
            </List>
          </Box>
        </Stack>
        <Stack sx={{ mt: 5 }} direction="column">
          <Box>
            <Typography
              sx={{ textAlign: isXs ? "center" : "left" }}
              variant="h5"
            >
              Steps
            </Typography>
            <List sx={{ mt: 4, mb: 5 }}>
              <RenderSteps steps={recipe?.steps} />
            </List>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SingleRecipe;
