import React from "react";
import { Stack, Box, Typography, Link, Button } from "@mui/material";
import { Link as ReactLink } from "react-router-dom";

const AddMoreContent = ({ content, contentLink }) => {
  return (
    <Box>
      <Stack alignItems="center" sx={{ mt: 3 }}>
        <Typography>You don't have any {content} yet.</Typography>
        <Link
          component={ReactLink}
          sx={{ textDecoration: "none" }}
          to={contentLink}
        >
          <Button sx={{ mt: 2 }} variant="btn">
            Add {content}
          </Button>
        </Link>
      </Stack>
    </Box>
  );
};

export default AddMoreContent;
