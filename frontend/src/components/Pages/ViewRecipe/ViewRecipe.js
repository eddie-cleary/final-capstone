import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { useParams } from "react-router-dom";
import {
  Stack,
  Card,
  CardMedia,
  Box,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../../shared/baseUrl";
import { useSelector } from "react-redux";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import servingsIcon from "./icons/servings.png";
import prepIcon from "./icons/prepare.png";
import cookIcon from "./icons/cooking.png";

//////////////////////////////////////////////////////////remove after import is working
const Fraction = require("fractional").Fraction;

function convertToMeasurement(quantity, liquid) {
  const values = getValues(liquid);

  let counts = {};

  for (let key in values) {
    // handle everything from teaspoon and up
    while (
      quantity >= values[key] ||
      (quantity / values[key]).toFixed(2) == 0.75 ||
      (quantity / values[key]).toFixed(2) == 0.67 ||
      (quantity / values[key]).toFixed(2) == 0.5 ||
      (quantity / values[key]).toFixed(2) == 0.33 ||
      (quantity / values[key]).toFixed(2) == 0.25
    ) {
      if (!counts[key]) {
        counts[key] = "";
      }
      if ((quantity / values[key]).toFixed(2) == 0.75) {
        counts[key] = `${counts[key]} 3/4`;
        quantity /= values[key];
        quantity = Math.trunc(quantity);
        continue;
      } else if ((quantity / values[key]).toFixed(2) == 0.67) {
        counts[key] = `${counts[key]} 2/3`;
        quantity /= values[key];
        quantity = Math.trunc(quantity);
        continue;
      } else if ((quantity / values[key]).toFixed(2) == 0.5) {
        counts[key] = `${counts[key]} 1/2`;
        quantity /= values[key];
        quantity = Math.trunc(quantity);
        continue;
      } else if ((quantity / values[key]).toFixed(2) == 0.33) {
        counts[key] = `${counts[key]} 1/3`;
        quantity /= values[key];
        quantity = Math.trunc(quantity);
        continue;
      } else if ((quantity / values[key]).toFixed(2) == 0.25) {
        counts[key] = `${counts[key]} 1/4`;
        quantity /= values[key];
        quantity = Math.trunc(quantity);
        continue;
      } else if (quantity >= values[key]) {
        // if the key exists, increase value
        counts[key]++;
        quantity = quantity - values[key];
      }
      // subtract solid value each time through loop
    }
  }
  // remaining values are less than a teaspoon
  // convert to a fraction

  if (quantity === 0) {
    return formatCountsString(counts);
  }

  const divisor = 1 / Object.entries(values)[2][1];

  let fraction = (quantity * divisor).toString();

  if (fraction == 0) {
    return formatCountsString(counts);
  } else {
    if (fraction.startsWith(0.66)) {
      fraction = "2/3";
    } else if (fraction.startsWith(0.33)) {
      fraction = "1/3";
    } else {
      fraction = new Fraction(fraction);
      fraction = fraction.toString();
    }

    if (!liquid) {
      if (counts.teaspoon) {
        counts.teaspoon =
          counts.teaspoon + ` ${fraction === 0 ? "" : fraction}`;
      } else {
        // teaspoons don't exist, create teaspoon key and add remaining fraction
        counts.teaspoon = fraction === 0 ? "" : fraction;
      }
    } else {
      if (counts.ounce) {
        counts.ounce = counts.ounce + ` ${fraction === 0 ? "" : fraction}`;
      } else {
        // teaspoons don't exist, create teaspoon key and add remaining fraction
        counts.ounce = fraction === 0 ? "" : fraction;
      }
    }
  }

  return formatCountsString(counts);
}

export const calculateQuantity = (number, fraction, unitOfMeasure) => {
  const allValues = {
    teaspoon: 8,
    tablespoon: 24,
    ounce: 48,
    cup: 384,
    pint: 768,
    quart: 1536,
  };

  const measurement = unitOfMeasure.toLowerCase();
  const currQuantity = allValues[measurement];

  return (
    (number ? number * currQuantity : 0) +
    (fraction ? fraction * currQuantity : 0)
  );
};

const formatCountsString = (countsObj) => {
  let newString = "";
  for (let key in countsObj) {
    newString += `${countsObj[key]} ${key} `;
  }
  return newString.replace(/\s+/g, " ").trim();
};

const getValues = (liquid) => {
  const solidValues = {
    cup: 384,
    tablespoon: 24,
    teaspoon: 8,
  };
  const liquidValues = {
    quart: 1536,
    pint: 768,
    ounce: 48,
  };

  if (liquid) {
    return liquidValues;
  } else {
    return solidValues;
  }
};

///////////////////////////////////////////////////////////////////////

let RenderIngredients = ({ ingredients }) => {
  let renderedIngredients = [];
  ingredients?.map((ingredient) => {
    const {
      id: recipeId,
      quantity: quantityTsp,
      ingredient: ingredientName,
    } = ingredient;
    let liquid = false; //either axios.get, or change the obj returned from endpoint.
    let convertedMeasurement = convertToMeasurement(quantityTsp, liquid);
    renderedIngredients.push(convertedMeasurement + " of " + ingredientName);
  });
  return renderedIngredients.map((ingredient) => (
    <List key={ingredient}>
      <ListItem>
        <ListItemIcon>
          <AddShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary={ingredient} />
      </ListItem>
    </List>
  ));
};

const RenderSteps = ({ steps }) => {
  let renderedSteps = [];

  steps?.map((step, index) => {
    const { info: currentStep } = step;
    renderedSteps.push(index + 1 + ". " + currentStep);
  });
  return renderedSteps.map((step) => (
    <List key={step}>
      <ListItem>
        <ListItemIcon>
          <ChevronRightIcon />
        </ListItemIcon>
        <ListItemText primary={step} />
      </ListItem>
    </List>
  ));
};

const InfoCard = (props) => {
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 180,
      }}
    >
      <CardMedia
        component="img"
        alt="prepare icon"
        height="140"
        image={props.img}
      />
      <Typography variant="h5" component="div">
        <BoldUnderline text={props.name} />
      </Typography>
      <Typography variant="h5">{props.text}</Typography>
    </Card>
  );
};

const GridItem = ({ title }) => {
  return (
    <Grid item xs={12}>
      <Paper elevation={5}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={4}
          sx={{ width: "38vw" }}
        >
          <Typography variant="h3">{title}</Typography>
        </Box>
      </Paper>
    </Grid>
  );
};

const BoldUnderline = ({ text }) => {
  return (
    <Box fontWeight="fontWeightBold" textDecoration="underline">
      {text}
    </Box>
  );
};

const SingleRecipe = ({ props }) => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const recipePrepTime = recipe.prepTime;
  const recipeCookTime = recipe.cookTime;

  useEffect(() => {
    axios
      .get(baseUrl + `/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRecipe(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(JSON.stringify({ recipe }));

  return (
    <Layout>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={12}>
          <Paper elevation={5}>
            <Box
              display="flex"
              justifyContent="center"
              p={2}
              component="img"
              src={recipe.imgUrl}
              alt={`Picture of ${recipe.title}`}
              sx={{
                aspectRatio: "6/4",
                width: "38vw",
                maxHeight: "68vh",
                objectFit: "cover",
              }}
            />
          </Paper>
        </Grid>

        <GridItem title={recipe.title} />
        {/* <GridItem title={`Category: ${recipe.category}`} /> */}
        <GridItem title={recipe.description} />

        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          width="38vw"
          spacing={4}
          sx={{ mt: 4 }}
        >
          <InfoCard
            name="Servings"
            text={`${recipe.servings}`}
            img={servingsIcon}
          />
          <InfoCard
            name="Prep time"
            text={
              recipePrepTime == 1 ? "1 minute" : `${recipePrepTime} minutes`
            }
            img={prepIcon}
          />
          <InfoCard
            name="Cook time"
            text={
              recipeCookTime == 1 ? "1 minute" : `${recipeCookTime} minutes`
            }
            img={cookIcon}
          />
        </Stack>

        <Stack
          direction="column"
          justifyContent="center"
          width="38vw"
          spacing={2}
          sx={{ mt: 5 }}
        >
          <Paper elevation={5}>
            <Box p={4}>
              <Typography variant="h4">Ingredients</Typography>
              <RenderIngredients ingredients={recipe.recipeIngredients} />
            </Box>
          </Paper>
        </Stack>

        <Stack
          direction="column"
          justifyContent="space-evenly"
          alignItems="center"
          width="100vh"
          spacing={2}
          sx={{ mt: 5, mb: 4 }}
        >
          <Paper elevation={5}>
            <Box p={4} sx={{ width: "38vw" }}>
              <Typography variant="h4">Steps</Typography>
              <RenderSteps steps={recipe.steps} />
            </Box>
          </Paper>
        </Stack>
      </Grid>
    </Layout>
  );
};

export default SingleRecipe;
