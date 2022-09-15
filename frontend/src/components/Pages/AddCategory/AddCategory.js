import React, { useState } from "react";
import {
  Stack,
  InputLabel,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import Layout from "../../Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../shared/baseUrl";
import { useSelector, useDispatch } from "react-redux";
import { CustomButton } from "../../..";
import ErrorDisplay from "../../shared/ErrorDisplay";
import {
  setShowError,
  setShowSuccess,
  setSuccessMsg,
  setErrorMsg,
} from "../../../redux/features/forms/errors/errorsSlice";

const AddIngredient = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = { name };
    setIsLoading(true);
    axios
      .post(baseUrl + `/category/add`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setSuccessMsg("Category Added!"));
        dispatch(setShowSuccess(true));
      })
      .catch((err) => {
        dispatch(setErrorMsg(err));
        dispatch(setShowError(true));
      })
      .then(() => {
        setIsLoading(false);
        clearFormState();
      });
  };

  const clearFormState = () => {
    setName("");
  };

  return (
    <Layout>
      <section>
        <Stack>
          <Stack sx={{ maxWidth: "550px" }}>
            <Typography variant="h4" element="h1">
              Add Category
            </Typography>
            <form>
              <Stack sx={{ mt: 5 }}>
                <InputLabel>Name</InputLabel>
                <TextField
                  value={name}
                  onChange={(e) => {
                    const { value } = e.target;
                    const re = /^[A-Za-z]+$/;
                    if (value === "" || re.test(value)) {
                      setName(value);
                    }
                  }}
                  sx={{ mt: 1 }}
                  placeholder="Category name"
                ></TextField>
                <CustomButton
                  sx={{ mt: 3 }}
                  onClick={handleSubmit}
                  variant="contained"
                >
                  {isLoading ? <CircularProgress /> : "Add Category"}
                </CustomButton>
              </Stack>
            </form>
          </Stack>
        </Stack>
      </section>
      <ErrorDisplay />
    </Layout>
  );
};

export default AddIngredient;
