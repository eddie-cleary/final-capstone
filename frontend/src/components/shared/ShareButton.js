import * as React from "react";
import ShareIcon from "@mui/icons-material/Share";
import Popper from "@mui/material/Popper";
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LinkIcon from "@mui/icons-material/Link";
import { IconButton } from "@mui/material";
import { Box } from "@mui/material";
import {
  setShowSuccess,
  setSuccessMsg,
} from "../../redux/features/forms/errors/errorsSlice";
import { useDispatch } from "react-redux";

export default function ShareButton({ recipe }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const CopyToClipboard = (toCopy) => {
    const el = document.createElement(`textarea`);
    el.value = toCopy;
    el.setAttribute(`readonly`, ``);
    el.style.position = `absolute`;
    el.style.left = `-9999px`;
    document.body.appendChild(el);
    el.select();
    document.execCommand(`copy`);
    document.body.removeChild(el);

    dispatch(setSuccessMsg(`Copied ${recipe.name}`));
    dispatch(setShowSuccess(true));
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const ahref = `${process.env.REACT_APP_BASE_URL}/recipes/${recipe.id}`;
  return (
    <Box>
      <IconButton aria-describedby={id} type="button" onClick={handleClick}>
        <ShareIcon color="primary" />
      </IconButton>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
          <IconButton aria-describedby={id} type="button" onClick={handleClick}>
            <FacebookSharpIcon
              onClick={() =>
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${ahref}`
                )
              }
            />
          </IconButton>
          <br />
          <IconButton aria-describedby={id} type="button" onClick={handleClick}>
            <TwitterIcon
              onClick={() =>
                window.open(`https://twitter.com/intent/tweet?url=${ahref}`)
              }
            />
          </IconButton>
          <br />
          <IconButton aria-describedby={id} type="button" onClick={handleClick}>
            <LinkedInIcon
              onClick={() =>
                window.open(
                  `https://linkedin.com/sharing/share-offsite/?url=${ahref}`
                )
              }
            />
          </IconButton>
          <br />
          <IconButton aria-describedby={id} type="button" onClick={handleClick}>
            <LinkIcon
              onClick={() => {
                CopyToClipboard(ahref);
              }}
            />
          </IconButton>
        </Box>
      </Popper>
    </Box>
  );
}
