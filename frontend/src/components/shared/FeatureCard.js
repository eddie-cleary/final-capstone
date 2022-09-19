import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";

const FeatureCard = ({ image, title, text, cssOverride }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        border: `1px solid ${theme.palette.primary.main}`,
        width: "350px",
        minHeight: "260px",
        borderRadius: "15px",
      }}
    >
      <CardMedia
        sx={{ objectPosition: "bottom" }}
        component="img"
        height="150px"
        image={image}
        alt={title}
      />
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h6">{title}</Typography>
        <Typography sx={{ mt: 1 }}>{text}</Typography>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
