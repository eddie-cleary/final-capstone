package com.techelevator.service;

import com.techelevator.entity.Recipe;

import java.security.Principal;
import java.util.Optional;

public interface RecipeService {
    Recipe saveRecipe(Principal principal, Recipe recipe);
    Recipe getRecipeById(Long id);
}
