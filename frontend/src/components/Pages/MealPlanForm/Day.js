import React from "react";
import { Stack, Typography, Button, Box, useTheme } from "@mui/material";
import { RemoveCircle } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { removeDay } from "../../../redux/features/forms/mealplan/mealPlanDataSlice";
import MealsList from "./MealsList";

const Day = ({ dayIndex }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <Stack
      alignItems="center"
      sx={{
        border: `1px solid ${theme.palette.text.main}`,
        borderRadius: "10px",
        width: "100%",
        maxWidth: "280px",
        height: "600px",
        position: "relative",
        overflow: "scroll",
        padding: "0 10px",
        ml: 2,
        "&::-webkit-scrollbar": {
          display: "none",
        },
        mb: 3,
      }}
    >
      <Box>
        <Typography sx={{ mt: 3 }} variant="h5" element="h4">
          {`Day ${dayIndex + 1}`}
        </Typography>
        <Button
          sx={{
            position: "absolute",
            top: "25px",
            left: "-5px",
          }}
          onClick={() => dispatch(removeDay(dayIndex))}
        >
          <RemoveCircle color="warning" sx={{ fontSize: "25px" }} />
        </Button>
      </Box>
      <Stack sx={{ width: "100%" }}>
        <MealsList dayIndex={dayIndex} />
      </Stack>
    </Stack>
  );
};

export default Day;
