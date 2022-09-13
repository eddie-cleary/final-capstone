import React, { useEffect } from "react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { Button, Typography, Stack, Link } from "@mui/material";
import { deleteUser, addToken } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const sidebar = {
  width: "200px",
  marginTop: "30px",
};

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roles = useSelector((state) => state.auth.user.roles);
  const isAdmin = roles.some(
    (role) => role.name === "ROLE_ADMIN" || role.name === "ROLE_SUPER_ADMIN"
  );

  return (
    <>
      <Stack sx={sidebar}>
        <Button variant="text">
          <Link
            to="/recipes"
            sx={{ width: "100%" }}
            component={ReactLink}
            underline="none"
          >
            View Recipes
          </Link>
        </Button>
        <Button variant="text">
          <Link
            sx={{ width: "100%" }}
            to="/myrecipes"
            component={ReactLink}
            underline="none"
          >
            My Recipes
          </Link>
        </Button>
        <Button variant="text">
          <Link
            sx={{ width: "100%" }}
            to="/mealplans"
            component={ReactLink}
            underline="none"
          >
            My Meal Plans
          </Link>
        </Button>
        <Button variant="text">
          <Link
            sx={{ width: "100%" }}
            to="/recipes/add"
            component={ReactLink}
            underline="none"
          >
            Add Recipe
          </Link>
        </Button>
        <Button variant="text">
          <Link
            sx={{ width: "100%" }}
            to="/ingredient/add"
            component={ReactLink}
            underline="none"
          >
            Add Ingredient
          </Link>
        </Button>
        {isAdmin && (
          <Button variant="text">
            <Link
              sx={{ width: "100%" }}
              to="/category/add"
              component={ReactLink}
              underline="none"
            >
              Add Category
            </Link>
          </Button>
        )}
        <Button variant="text">
          <Link
            sx={{ width: "100%" }}
            to="/mealplans/add"
            component={ReactLink}
            underline="none"
          >
            Add Meal Plan
          </Link>
        </Button>
        <Button
          onClick={() => {
            dispatch(deleteUser());
            dispatch(addToken(null));
            navigate("/");
          }}
        >
          Logout
        </Button>
      </Stack>
    </>
  );
};

export default Sidebar;
