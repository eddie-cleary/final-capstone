import React from "react";
import { NavLink as ReactNavLink, useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
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

  const linkStyles = {
    width: "100%",
    textDecoration: "none",
    "&.active": {
      fontWeight: "bold",
    },
  };

  return (
    <Stack sx={sidebar}>
      <Button
        to="/allrecipes"
        sx={linkStyles}
        component={ReactNavLink}
        variant="text"
      >
        View Recipes
      </Button>
      <Button
        to="/myrecipes"
        sx={linkStyles}
        component={ReactNavLink}
        variant="text"
      >
        My Recipes
      </Button>
      <Button
        to="/mymealplans"
        sx={linkStyles}
        component={ReactNavLink}
        variant="text"
      >
        My Meal Plans
      </Button>
      <Button
        to="/addrecipe"
        sx={linkStyles}
        component={ReactNavLink}
        variant="text"
      >
        Add Recipe
      </Button>
      <Button
        to="/ingredient/add"
        sx={linkStyles}
        component={ReactNavLink}
        variant="text"
      >
        Add Ingredient
      </Button>
      {isAdmin && (
        <Button
          to="/category/add"
          sx={linkStyles}
          component={ReactNavLink}
          variant="text"
        >
          Add Category
        </Button>
      )}
      <Button
        to="/mealplans/add"
        sx={linkStyles}
        component={ReactNavLink}
        variant="text"
      >
        Add Meal Plan
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
  );
};

export default Sidebar;
