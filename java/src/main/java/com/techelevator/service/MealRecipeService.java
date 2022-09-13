package com.techelevator.service;

import com.techelevator.entity.MealPlan;
import com.techelevator.entity.MealRecipe;
import com.techelevator.model.MealPlanDTO;
import com.techelevator.model.MealRecipeDTO;

import java.util.List;

public interface MealRecipeService {

    MealRecipe getMealRecipeById(String username, Long mealRecipeId);

//    MealRecipe createMealRecipe(String username, MealRecipeDTO mealRecipeDTO);

    Boolean updateServingsById(String username, Long mealRecipeId, MealRecipeDTO mealRecipeDTO);

    Boolean deleteMealRecipe(String username, Long mealRecipeId);
}
