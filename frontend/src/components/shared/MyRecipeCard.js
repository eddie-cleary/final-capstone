import {
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Link,
  Button,
  Modal,
  Box,
  Typography,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useState } from "react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { baseUrl } from "../../shared/baseUrl";
import {
  setShowError,
  setErrorMsg,
  setShowSuccess,
  setSuccessMsg,
} from "../../redux/features/forms/errors/errorsSlice";

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
export default function MyRecipeCard({ recipe, refreshParent }) {
  const token = useSelector((state) => state.auth.token);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (e) => {
    e.preventDefault();
    setShowDeleteModal(true);
    return;
  };

  const handleEdit = (e) => {
    e.preventDefault();
    navigate(`/recipes/edit/${recipe.id}`);
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
        dispatch(setSuccessMsg(`${recipe.name} deleted!`));
        dispatch(setShowSuccess(true));
        refreshParent();
      })
      .catch((err) => {
        dispatch(setErrorMsg(`Error deleting recipe. ${err.message}`));
        dispatch(setShowError(true));
      });
  };

  return (
    <>
      <Link component={ReactLink} to={`/recipes/${recipe.id}`}>
        <Card elevation={5} sx={{ m: 2, height: 340, width: 330 }}>
          <CardMedia
            component="img"
            height="220"
            image={
              recipe.imgId &&
              `https://res.cloudinary.com/djoe/image/upload/c_fill,h_500,w_500/${recipe.imgId}.jpg`
            }
            alt={recipe.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5">
              {recipe.name}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              alignItems: "center",
              mt: -1.5,
              ml: -1,
            }}
          >
            <Tooltip title="Edit">
              <IconButton onClick={handleEdit}>
                <Edit color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={handleDelete}>
                <Delete color="warning" />
              </IconButton>
            </Tooltip>
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
              >{`Are you sure you want to delete ${recipe.name}?`}</Typography>
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
    </>
  );
}
