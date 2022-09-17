import React, { useState } from "react";
import {
  Stack,
  InputLabel,
  TextField,
  CircularProgress,
  Button,
} from "@mui/material";
import Layout from "../../Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../shared/baseUrl";
import { useSelector, useDispatch } from "react-redux";
import ErrorDisplay from "../../shared/ErrorDisplay";
import {
  setShowError,
  setShowSuccess,
  setSuccessMsg,
  setErrorMsg,
} from "../../../redux/features/forms/errors/errorsSlice";
import PageTitle from "../../shared/PageTitle";
import PageLayout from "../../shared/PageLayout";

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
      <PageLayout>
        <Stack sx={{ maxWidth: "550px", width: "100%" }}>
          <PageTitle title="Add Category" />
          <form>
            <Stack>
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
              <Button sx={{ mt: 3 }} onClick={handleSubmit} variant="btn">
                {isLoading ? <CircularProgress /> : "Add Category"}
              </Button>
            </Stack>
          </form>
        </Stack>
      </PageLayout>
      <ErrorDisplay />
    </Layout>
  );
};

export default AddIngredient;
