import React, { useState } from "react";
import { Stack, Box, useMediaQuery } from "@mui/material";
import logo from "../../../assets/logo-square.svg";
import FeatureCard from "../../shared/FeatureCard";
import mealplanImg from "../../../assets/mealplan.jpg";
import recipesImg from "../../../assets/recipes.jpg";
import shoppingListImg from "../../../assets/shoppinglist.jpg";
import Footer from "../../Layout/Footer";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import ErrorDisplay from "../../shared/ErrorDisplay";

const SignIn = () => {
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const matches = useMediaQuery("(min-width: 900px)");

  return (
    <Stack alignItems="center" sx={{ minHeight: "100vh" }}>
      <Stack sx={{ px: 3, flexGrow: 1, maxWidth: "1600px", width: "100%" }}>
        <Box component="header" sx={{ mt: 3 }}>
          <Box
            component="img"
            src={logo}
            sx={{ height: matches ? "120px" : "100px" }}
            alt="Meal planner logo"
            onClick={() => setShowCreateAccount(false)}
          />
        </Box>
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              maxWidth: "450px",
              width: "100%",
              mt: matches ? 5 : 8,
              mx: "auto",
            }}
          >
            {showCreateAccount ? (
              <CreateAccount setShowCreateAccount={setShowCreateAccount} />
            ) : (
              <Login setShowCreateAccount={setShowCreateAccount} />
            )}
          </Box>
          <Stack alignItems="center">
            <Stack
              direction="row"
              justifyContent="center"
              sx={{
                width: "100%",
                flexWrap: "wrap",
                gap: "40px",
                mb: 13,
                mt: 7,
              }}
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
      </Stack>
      <Footer />
      <ErrorDisplay />
    </Stack>
  );
};

export default SignIn;
