package com.techelevator.service;

import com.techelevator.entity.Recipe;
import com.techelevator.model.RecipeDTO;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

public interface RecipeService {
    Recipe addRecipe(String username, RecipeDTO recipeDTO);
    Recipe getRecipeById(Long id);
    List<Recipe> getAllRecipes();
    boolean likeRecipeForUser(String username, Long recipeId);
    List<Recipe> getMyRecipes(String username);
    Recipe updateRecipe (String username, Long id, RecipeDTO recipeDTO);
    Boolean deleteRecipe (String username, Long recipeId);
}
