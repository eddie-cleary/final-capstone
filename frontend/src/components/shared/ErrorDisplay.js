import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  setShowError,
  setShowSuccess,
} from "../../redux/features/forms/errors/errorsSlice";

const ErrorDisplay = () => {
  const showSuccess = useSelector((state) => state.errors.showSuccess);
  const showError = useSelector((state) => state.errors.showError);
  const successMsg = useSelector((state) => state.errors.successMsg);
  const errMsg = useSelector((state) => state.errors.errorMsg);
  const dispatch = useDispatch();

  const closeError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setShowError(false));
  };

  const closeSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setShowSuccess(false));
  };

  return (
    <>
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
    </>
  );
};

export default ErrorDisplay;
