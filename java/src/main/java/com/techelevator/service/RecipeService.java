package com.techelevator.service;

import com.techelevator.entity.Recipe;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

public interface RecipeService {
    Recipe addRecipe(Principal principal, Recipe recipe);
    Recipe getRecipeById(Long id);
    List<Recipe> getAllRecipes();
}
