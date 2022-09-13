import React, { useState, useEffect } from "react";
import {
  useTheme,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Box,
  Chip,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../../shared/baseUrl";
import { useSelector, useDispatch } from "react-redux";
import { setCategories } from "../../../redux/features/forms/addrecipe/addRecipeDataSlice";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const CategorySelect = () => {
  const theme = useTheme();
  const token = useSelector((state) => state.auth.token);
  const [allCategories, setAllCategories] = useState([]);
  const chosenCategories = useSelector(
    (state) => state.addRecipeData.categories
  );
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(baseUrl + `/category`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setAllCategories(res.data))
      .catch((err) => console.log(err.response));
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    dispatch(
      setCategories(typeof value === "string" ? value.split(",") : value)
    );
  };

  return (
    <div>
      <FormControl sx={{ mt: 3, width: "100%" }}>
        <InputLabel id="category-chip-label">Category</InputLabel>
        <Select
          labelId="category-chip-label"
          id="category-chip"
          multiple
          value={chosenCategories}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Category" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {allCategories.map((category) => (
            <MenuItem
              key={category.name}
              value={category.name}
              style={getStyles(category.name, allCategories, theme)}
            >
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CategorySelect;
