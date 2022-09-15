import { Stack, Link, Button, Typography, Box } from "@mui/material";
import { Link as ReactLink } from "react-router-dom";
import Header from "../../Layout/Header";

const Home = () => {
  const btn = {
    width: "300px",
    height: "50px",
    fontWeight: "bold",
    border: "1px solid darkGreen",
    margin: "auto",
    backgroundColor: "#9fcf6f",
    "&:hover": {
      boxShadow: 8,
      backgroundColor: "#71af47",
    },
  };
  const styles = {
    boxContainer: {
      backgroundImage: `url("https://images.unsplash.com/photo-1636065641424-a9f9493c1e6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "top",
      height: "calc(100vh - 50px)",
      display: "grid",
      gridTemplateAreas: `"btnContainer" "collabCredit"`,
    },
  };
  const btnContainer = {
    gridArea: "btnContainer",
    flexDriection: "column",
    marginTop: "200px",
    marginBottom: "20px",
  };

  const collabCredit = {
    textAlign: "center",
    gridArea: "collabCredit",
    fontWeight: "bold",
    marginBottom: "50px",
  };
  return (
    <Box>
      <Header />
      <Box style={styles.boxContainer}>
        <Stack sx={btnContainer}>
          <Typography variant="h2" textAlign="center" fontWeight="bolder">
            Get Started
          </Typography>
          <Button variant="contained" sx={btn}>
            <Link
              to="/recipes/add"
              component={ReactLink}
              underline="none"
              color="black"
            >
              Add a New Recipe
            </Link>
          </Button>
          <Button variant="contained" sx={btn}>
            <Link
              to="/recipes"
              component={ReactLink}
              underline="none"
              color="black"
            >
              Browse All Your Recipes
            </Link>
          </Button>

          <Button variant="contained" sx={btn}>
            <Link
              to="/mealplans"
              component={ReactLink}
              underline="none"
              color="black"
            >
              Create a MealPlan
            </Link>
          </Button>
          <Button variant="contained" sx={btn}>
            <Link
              to="/mealplans"
              component={ReactLink}
              underline="none"
              color="black"
            >
              View All Your MealPlans
            </Link>
          </Button>
          <Box alignContent="center" marginTop="10px">
            <Typography textAlign="center">
              My Digital Meal Planner &reg; {new Date().getFullYear()} <br />
            </Typography>
            <Typography sx={collabCredit}>
              Created in Collaboration <br /> by: Edward Cleary, Kimberly
              Bryant, Chantele Lohr, and Brandon Vo
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Home;
