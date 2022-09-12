import { createSlice } from "@reduxjs/toolkit";

const mealObj = { title: "", recipes: [] };
const dayObj = [mealObj];

const initialState = {
  id: "",
  title: "",
  days: [dayObj],
  recipesModal: { isShowing: false, dayIndex: 0, mealIndex: 0 },
};

export const mealPlanDataSlice = createSlice({
  name: "mealPlanData",
  initialState,
  reducers: {
    setTitle(state, action) {
      state.title = action.payload;
    },
    addDay(state) {
      state.days.push(dayObj);
    },
    removeDay(state, action) {
      const dayIndex = action.payload;
      state.days = state.days.filter((i, idx) => idx !== dayIndex);
    },
    addMeal(state, action) {
      const dayIndex = action.payload;
      state.days[dayIndex].push(mealObj);
    },
    removeMeal(state, action) {
      const { dayIndex, mealIndex } = action.payload;
      state.days[dayIndex] = state.days[dayIndex].filter(
        (i, idx) => idx !== mealIndex
      );
    },
    setMealTitle(state, action) {
      const { title, dayIndex, mealIndex } = action.payload;
      state.days[dayIndex][mealIndex].title = title;
    },
    addRecipeToMeal(state, action) {
      const { dayIndex, mealIndex } = state.recipesModal;
      const recipe = action.payload;
      state.days[dayIndex][mealIndex].recipes.push(recipe);
      state.recipesModal.isShowing = false;
    },
    removeRecipeFromMeal(state, action) {
      const { dayIndex, mealIndex, recipeIndex } = action.payload;
      state.days[dayIndex][mealIndex].recipes.splice(recipeIndex, 1);
    },
    showRecipesModal(state, action) {
      const { dayIndex, mealIndex } = action.payload;
      state.recipesModal = {
        isShowing: true,
        dayIndex: dayIndex,
        mealIndex: mealIndex,
      };
    },
    closeRecipesModal(state) {
      state.recipesModal.isShowing = false;
    },
    resetState: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const {
  setTitle,
  addDay,
  removeDay,
  addMeal,
  removeMeal,
  setMealTitle,
  addRecipe,
  showRecipesModal,
  closeRecipesModal,
  addRecipeToMeal,
  removeRecipeFromMeal,
} = mealPlanDataSlice.actions;

export default mealPlanDataSlice.reducer;
