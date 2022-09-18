import axios from "axios";
import { baseUrl } from "../../shared/baseUrl";
import { store } from "../../redux/store";
import { setAllIngredients } from "../../redux/features/forms/addrecipe/addRecipeIngredientSlice";
import {
  setErrorMsg,
  setShowError,
} from "../../redux/features/forms/errors/errorsSlice";

export const loadAllIngredients = () => {
  const token = store.getState().auth.token;
  const dispatch = store.dispatch();

  axios
    .get(process.env.REACT_APP_BASE_URL + "/ingredient", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(setAllIngredients(res.data));
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
    });
};

export default loadAllIngredients;
