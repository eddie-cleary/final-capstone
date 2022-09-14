import { createSlice } from "@reduxjs/toolkit";

const mealObj = {
  title: "",
  mealRecipes: [],
};
const dayObj = { meals: [mealObj] };

const initialState = {
  id: null,
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
      state.days.splice(dayIndex, 1);
    },
    addMeal(state, action) {
      const dayIndex = action.payload;
      state.days[dayIndex].meals.push(mealObj);
    },
    removeMeal(state, action) {
      const { dayIndex, mealIndex } = action.payload;
      state.days[dayIndex].meals.splice(mealIndex, 1);
    },
    setMealTitle(state, action) {
      const { title, dayIndex, mealIndex } = action.payload;
      state.days[dayIndex].meals[mealIndex].title = title;
    },
    addRecipeToMeal(state, action) {
      const { dayIndex, mealIndex } = state.recipesModal;
      const recipe = action.payload;
      state.days[dayIndex].meals[mealIndex].mealRecipes.push(recipe);
      state.recipesModal.isShowing = false;
    },
    removeRecipeFromMeal(state, action) {
      const { dayIndex, mealIndex, recipeIndex } = action.payload;
      state.days[dayIndex].meals[mealIndex].mealRecipes.splice(recipeIndex, 1);
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
    setMealPlanFormData(state, action) {
      return {
        ...action.payload,
        recipesModal: initialState.recipesModal,
      };
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
  setMealPlanFormData,
  resetState,
} = mealPlanDataSlice.actions;

export default mealPlanDataSlice.reducer;
