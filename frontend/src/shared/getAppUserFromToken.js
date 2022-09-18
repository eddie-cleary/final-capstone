import { baseUrl } from "./baseUrl";
import axios from "axios";

const getAppUserFromToken = async (token) => {
  const user = await axios
    .get(process.env.REACT_APP_BASE_URL + `/verifyUser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

  if (user) {
    return user;
  } else {
    return null;
  }
};

export default getAppUserFromToken;
