import React from "react";
import {
  FormControl,
  InputLabel,
  Stack,
  TextField,
  Typography,
  Select,
  MenuItem,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Box } from "@mui/system";
import Layout from "../../Layout/Layout";

const AddRecipe = () => {
  return (
    <Layout>
      <section>
        <form>
          <Stack sx={{ maxWidth: "550px" }}>
            <Typography variant="h5">Add Recipe</Typography>
            <Stack sx={{ mt: 3 }}>
              <InputLabel>Title</InputLabel>
              <TextField sx={{ mt: 1 }} placeholder="Recipe title"></TextField>
            </Stack>
            <Stack sx={{ mt: 2 }}>
              <InputLabel>Description</InputLabel>
              <TextField
                sx={{ mt: 1 }}
                rows={3}
                multiline
                placeholder="Description"
              />
            </Stack>
            <Box sx={{ mt: 3 }}>
              <Typography sx={{ mb: -2 }}>Ingredients</Typography>
              <Stack
                direction="row"
                sx={{ flexWrap: "nowrap", alignItems: "flex-end" }}
              >
                <Stack sx={{ flexGrow: 1 }}>
                  <InputLabel>&nbsp;</InputLabel>
                  <TextField placeholder="Ingredient"></TextField>
                </Stack>
                <Stack sx={{ mx: 2 }}>
                  <InputLabel id="quantity">Quantity</InputLabel>
                  <Select
                    labelId="quantity"
                    id="quantity-select"
                    label="Quantity"
                    value={1}
                  >
                    <MenuItem value={1 / 8}>1/8</MenuItem>
                    <MenuItem value={1 / 4}>1/4</MenuItem>
                    <MenuItem value={1 / 3}>1/3</MenuItem>
                    <MenuItem value={1 / 2}>1/2</MenuItem>
                    <MenuItem value={2 / 3}>2/3</MenuItem>
                    <MenuItem value={3 / 4}>3/4</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                  </Select>
                </Stack>
                <Stack>
                  <InputLabel id="measurement">Measurement</InputLabel>
                  <Select
                    labelId="measurement"
                    id="measurement-select"
                    label="Measurement"
                    value={1}
                  >
                    <MenuItem value={1}>Teaspoon</MenuItem>
                    <MenuItem value={3}>Tablespoon</MenuItem>
                    <MenuItem value={4}>Cup</MenuItem>
                    <MenuItem value={5}>Pound</MenuItem>
                    <MenuItem value={6}>Quart</MenuItem>
                    <MenuItem value={7}>Pint</MenuItem>
                  </Select>
                </Stack>
                <Button variant="outlined" sx={{ height: "56px", ml: 2 }}>
                  -
                </Button>
              </Stack>
              <Stack direction="row" sx={{ mt: 2 }}>
                <TextField
                  sx={{ flexGrow: 1 }}
                  placeholder="Ingredient"
                ></TextField>
                <Button sx={{ ml: 2 }} variant="outlined">
                  +
                </Button>
              </Stack>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Typography sx={{ mt: 2 }}>Steps</Typography>
              <Box>
                <Stack direction="row" alignItems="stretch" sx={{ mt: 2 }}>
                  <InputLabel sx={{ mr: 2 }}>1</InputLabel>
                  <TextField sx={{ flexGrow: 1 }}></TextField>
                  <Button sx={{ ml: 2 }} variant="outlined" color="warning">
                    -
                  </Button>
                </Stack>
              </Box>
              <Stack direction="row" sx={{ mt: 2 }} justifyContent="center">
                <Button sx={{ px: 3 }} variant="contained">
                  Add Step
                </Button>
              </Stack>
            </Box>
            <Stack direction="row" sx={{ mt: 4 }}>
              <Box>
                <InputLabel id="servings">Servings</InputLabel>
                <TextField placeholder="Servings" id="servings"></TextField>
              </Box>
              <Box sx={{ mx: 3 }}>
                <InputLabel id="preptime">Prep Time</InputLabel>
                <TextField placeholder="Prep Time" id="preptime"></TextField>
              </Box>
              <Box>
                <InputLabel id="cooktime">Cook Time</InputLabel>
                <TextField placeholder="Cook Time" id="cooktime"></TextField>
              </Box>
            </Stack>
            <Stack sx={{ mt: 5 }} direction="row" justifyContent="center">
              <FormControlLabel
                sx={{ textAlign: "center" }}
                control={<Checkbox defaultChecked />}
                label="Mark as favorite?"
              />
            </Stack>
            <Button variant="contained">Add Recipe</Button>
          </Stack>
        </form>
      </section>
    </Layout>
  );
};

export default AddRecipe;
