import React, { useState, useEffect } from "react";
import {
  Stack,
  InputLabel,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Alert,
  Snackbar,
  Button,
  CircularProgress,
} from "@mui/material";
import Layout from "../../Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../shared/baseUrl";
import { useSelector } from "react-redux";

const AddIngredient = () => {
  const [name, setName] = useState("");
  const [liquid, setLiquid] = useState(false);
  const [successMsg, setSuccessMsg] = useState();
  const [showSuccess, setShowSuccess] = useState();
  const [errMsg, setErrMsg] = useState();
  const [showError, setShowError] = useState();
  const [isLoading, setIsLoading] = useState();

  const token = useSelector((state) => state.auth.token);

  const handleSubmit = () => {
    const postData = { name, liquid };
    setIsLoading(true);
    axios
      .post(baseUrl + `/ingredient`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSuccessMsg("Ingredient Added!");
        openSuccess();
      })
      .catch((err) => {
        setErrMsg(err);
        openError();
      })
      .then(() => {
        setIsLoading(false);
        clearFormState();
      });
  };

  const clearFormState = () => {
    setName("");
    setLiquid("");
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

  return (
    <Layout>
      <section>
        <Stack>
          <Stack sx={{ maxWidth: "550px" }}>
            <Typography variant="h4" element="h1">
              Add Ingredient
            </Typography>
            <form>
              <Stack sx={{ mt: 5 }}>
                <InputLabel>Name</InputLabel>
                <TextField
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ mt: 1 }}
                  placeholder="Ingredient name"
                ></TextField>
                <FormControl sx={{ mt: 3 }}>
                  <Typography>Is it a liquid?</Typography>
                  <RadioGroup
                    defaultValue="no"
                    name="radio-buttons-group"
                    value={liquid}
                    onChange={(e) => setLiquid(e.target.value)}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
                <Button
                  sx={{ mt: 3 }}
                  onClick={handleSubmit}
                  variant="contained"
                >
                  {isLoading ? <CircularProgress /> : "Add Ingredient"}
                </Button>
              </Stack>
            </form>
          </Stack>
        </Stack>
      </section>
      <Snackbar
        open={showSuccess}
        autoHideDuration={5000}
        onClose={closeSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={closeSuccess} severity="success" sx={{ width: "100%" }}>
          {successMsg}
        </Alert>
      </Snackbar>
      <Snackbar
        open={showError}
        autoHideDuration={5000}
        onClose={closeError}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={closeError} severity="error" sx={{ width: "100%" }}>
          {errMsg}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default AddIngredient;
