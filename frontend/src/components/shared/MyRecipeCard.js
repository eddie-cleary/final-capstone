import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  IconButton,
  Link,
  Checkbox,
  Button,
  Modal,
  Box,
  Typography,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  FavoriteSharp,
  FavoriteBorder,
  Favorite,
  Delete,
  Edit,
} from "@mui/icons-material";
import { useState } from "react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../../shared/baseUrl";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  backgroundColor: "#fff",
  padding: "15px",
};

export default function MyRecipeCard({ recipe, refreshOnDelete }) {
  const currUserId = useSelector((state) => state.auth.user.id);
  const token = useSelector((state) => state.auth.token);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [showError, setShowError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const handleDelete = (e) => {
    e.preventDefault();
    if (recipe?.appUser?.id === currUserId || recipe?.appUser === currUserId) {
      setShowDeleteModal(true);
    }
    return;
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (recipe.appUser.id === currUserId) {
      navigate(`/recipes/edit/${recipe.id}`);
    }
  };

  const openSuccess = () => {
    setShowSuccess(true);
  };

  const closeSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSuccess(false);
  };

  const openError = () => {
    setShowError(true);
  };

  const closeError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowError(false);
  };

  const handlePostDelete = () => {
    setShowDeleteModal(false);
    axios
      .delete(baseUrl + `/recipes/${recipe.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // if response 200
        // update local state
        setSuccessMsg(`${recipe.title} deleted!`);
        setShowSuccess(true);
        refreshOnDelete();
      })
      .catch((err) => {
        setErrMsg(`Error deleting recipe. ${err.message}`);
        setShowError(true);
      });
  };

  return (
    <>
      <Link component={ReactLink} to={`/recipes/${recipe.id}`}>
        <Card elevation={5} sx={{ height: 340, width: 330 }}>
          <CardHeader
            // action={
            //   <IconButton>
            //     <FavoriteSharp color="warning" sx={{ marginRight: 1 }} />
            //   </IconButton>
            // }
            title={recipe.title}
          />
          <CardMedia
            component="img"
            height="194"
            image={
              recipe.imgId &&
              `https://res.cloudinary.com/djoe/image/upload/c_fill,h_500,w_500/${recipe.imgId}.jpg`
            }
            alt={recipe.title}
          />
          <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
            {/* <Checkbox
            checked={liked}
            icon={<FavoriteBorder color="warning" />}
            checkedIcon={<Favorite color="warning" />}
            onChange={(e) => setLiked(e.target.checked)}
          /> */}
            <Button onClick={handleDelete}>
              <Delete />
            </Button>
            <Button onClick={handleEdit}>
              <Edit />
            </Button>
          </CardActions>
        </Card>
      </Link>
      <Modal
        open={showDeleteModal}
        keepMounted
        onClose={() => setShowDeleteModal(false)}
        aria-labelledby="modal-register"
        aria-describedby="modal-register"
      >
        <Box style={modalStyle}>
          <form>
            <Stack alignItems="center">
              <Typography
                sx={{ textAlign: "center" }}
              >{`Are you sure you want to delete ${recipe.title}?`}</Typography>
              <Stack direction="row" sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  sx={{ ml: 2 }}
                  variant="contained"
                  onClick={handlePostDelete}
                  color="warning"
                >
                  Delete
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Modal>
      <Snackbar
        open={showSuccess}
        autoHideDuration={5000}
        onClose={closeSuccess}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={closeSuccess} severity="success" sx={{ width: "100%" }}>
          {successMsg}
        </Alert>
      </Snackbar>
      <Snackbar
        open={showError}
        autoHideDuration={5000}
        onClose={closeError}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={closeError} severity="error" sx={{ width: "100%" }}>
          {errMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
