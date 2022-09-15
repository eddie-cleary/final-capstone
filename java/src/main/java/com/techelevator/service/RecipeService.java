package com.techelevator.service;

import com.techelevator.model.RecipePayload;
import com.techelevator.model.RecipeResponse;

import java.util.List;

public interface RecipeService {
    RecipeResponse addRecipe(String username, RecipePayload recipePayload);
    RecipeResponse getRecipeById(String username, Long id);
    List<RecipeResponse> getAllRecipes(String username);
    boolean likeRecipeForUser(String username, Long recipeId);
    List<RecipeResponse> getMyRecipes(String username);
    RecipeResponse updateRecipe (String username, Long id, RecipePayload recipePayload) throws IllegalAccessException;
    Boolean deleteRecipe (String username, Long recipeId) throws IllegalAccessException;
}
