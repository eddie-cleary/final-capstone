import React, { useState } from "react";
import { Stack, Box } from "@mui/material";
import logo from "../../../assets/logo-square.svg";
import FeatureCard from "../../shared/FeatureCard";
import mealplanImg from "../../../assets/mealplan.jpg";
import recipesImg from "../../../assets/recipes.jpg";
import shoppingListImg from "../../../assets/shoppinglist.jpg";
import Footer from "../../Layout/Footer";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import ErrorDisplay from "../../shared/ErrorDisplay";

const headerStyles = {
  maxWidth: "1200px",
  width: "100%",
  mt: 4,
};

const SignIn = () => {
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  return (
    <Stack alignItems="center" sx={{ minHeight: "100vh" }}>
      <Box component="header" sx={headerStyles}>
        <Box
          component="img"
          src={logo}
          sx={{ height: "150px" }}
          alt="Meal planner logo"
        />
      </Box>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Box sx={{ maxWidth: "450px", width: "100%", mt: 20, mx: "auto" }}>
          {showCreateAccount ? (
            <CreateAccount setShowCreateAccount={setShowCreateAccount} />
          ) : (
            <Login setShowCreateAccount={setShowCreateAccount} />
          )}
        </Box>
        <Stack alignItems="center">
          <Stack
            direction="row"
            sx={{ width: "100%", flexWrap: "wrap", gap: "48px", mt: 13 }}
          >
            <FeatureCard
              image={mealplanImg}
              title={"Meal Planning"}
              text={"Create and print meal plans"}
            />
            <FeatureCard
              image={recipesImg}
              title={"Recipes"}
              text={"Save, edit, and share recipes"}
            />
            <FeatureCard
              image={shoppingListImg}
              title={"Grocery Lists"}
              text={"Generate grocery lists for easy shopping"}
            />
          </Stack>
        </Stack>
      </Box>
      <Footer />
      <ErrorDisplay />
    </Stack>
  );
};

export default SignIn;
