package com.techelevator.service;

import com.techelevator.entity.Recipe;
import com.techelevator.model.RecipeDTO;
import com.techelevator.model.RecipePayload;
import com.techelevator.model.RecipeResponse;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

public interface RecipeService {
    RecipeResponse addRecipe(String username, RecipePayload recipePayload);
    RecipeResponse getRecipeById(String username, Long id);
    List<Recipe> getAllRecipes();
    boolean likeRecipeForUser(String username, Long recipeId);
    List<Recipe> getMyRecipes(String username);
    Recipe updateRecipe (String username, Long id, RecipePayload recipePayload);
    Boolean deleteRecipe (String username, Long recipeId);
}
