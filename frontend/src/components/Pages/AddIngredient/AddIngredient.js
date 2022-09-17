import React, { useState } from "react";
import {
  Stack,
  InputLabel,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import Layout from "../../Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../shared/baseUrl";
import { useSelector, useDispatch } from "react-redux";
import {
  setShowSuccess,
  setSuccessMsg,
  setErrorMsg,
  setShowError,
} from "../../../redux/features/forms/errors/errorsSlice";

const AddIngredient = () => {
  const [name, setName] = useState("");
  const [liquid, setLiquid] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const dispatch = useDispatch();

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
        dispatch(setSuccessMsg("Ingredient Added!"));
        dispatch(setShowSuccess(true));
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          dispatch(setErrorMsg(err.response.data.message));
        } else if (err.response?.statusText) {
          dispatch(setErrorMsg(err.response.statusText));
        } else if (err.request) {
          dispatch(setErrorMsg("Network error."));
        } else {
          dispatch(setErrorMsg("Error"));
        }
        dispatch(setShowError(true));
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
                  onChange={(e) => {
                    const { value } = e.target;
                    const re = /^[A-Za-z]+$/;
                    if (value === "" || re.test(value)) {
                      setName(value);
                    }
                  }}
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
    </Layout>
  );
};

export default AddIngredient;
