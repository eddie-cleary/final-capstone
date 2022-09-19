import {
  Link,
  Button,
  Modal,
  Box,
  Typography,
  Stack,
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useState } from "react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
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
  backgroundColor: "#fff",
  p: 4,
  borderRadius: 3,
  overflow: "hidden",
};
export default function MyRecipeCard({ recipe, refreshParent }) {
  const token = useSelector((state) => state.auth.token);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

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
      .delete(process.env.REACT_APP_BASE_URL + `/recipes/${recipe.id}`, {
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
      <Box
        component="article"
        sx={{
          m: 2,
          height: 270,
          width: 340,
          borderRadius: "12px",
          border: `1px solid ${theme.palette.text.main}`,
          p: 0,
          overflow: "hidden",
        }}
      >
        <Link
          sx={{ textDecoration: "none", pb: 0 }}
          component={ReactLink}
          to={`/recipes/${recipe.id}`}
        >
          <Stack sx={{ height: "100%" }}>
            <Box
              component="img"
              src={
                recipe.imgId &&
                `https://res.cloudinary.com/djoe/image/upload/c_fill,h_500,w_500/${recipe.imgId}.jpg`
              }
              alt={recipe.name}
              sx={{ height: 150, objectFit: "cover", objectPosition: "center" }}
            />
            <Box component="div" sx={{ height: "100%" }}>
              <Stack
                direction="row"
                sx={{ height: "100%", p: 1.5 }}
                justifyContent="space-between"
              >
                <Stack justifyContent="space-between" sx={{ width: "100%" }}>
                  <Typography sx={{ textAlign: "center" }} variant="titleSmall">
                    {recipe.name.length > 50
                      ? recipe.name.substring(0, 70) + "..."
                      : recipe.name}
                  </Typography>
                  <Stack
                    flexDirection="row"
                    justifyContent="center"
                    alignSelf="flex-end"
                    sx={{ width: "100%", mb: -0.5 }}
                  >
                    <Tooltip sx={{ mr: 2 }} title="Edit">
                      <IconButton onClick={handleEdit}>
                        <Edit fontSize="small" color="primary" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={handleDelete}>
                        <Delete fontSize="small" color="warning" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Link>
      </Box>

      {/* </Card>
      </Link> */}
      <Modal
        open={showDeleteModal}
        keepMounted
        onClose={() => setShowDeleteModal(false)}
        aria-labelledby="modal-register"
        aria-describedby="modal-register"
      >
        <Box sx={modalStyle}>
          <form>
            <Stack alignItems="center">
              <Typography
                sx={{ textAlign: "center" }}
              >{`Are you sure you want to delete "${recipe.name}?"`}</Typography>
              <Stack direction="row" sx={{ mt: 4 }}>
                <Button variant="btn" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </Button>
                <Button
                  sx={{ ml: 2 }}
                  variant="btn-warning"
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
