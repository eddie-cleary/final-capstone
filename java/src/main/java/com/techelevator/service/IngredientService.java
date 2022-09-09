package com.techelevator.service;

import com.techelevator.entity.Ingredient;

import java.util.List;
import java.util.Optional;

public interface IngredientService {
    Ingredient addIngredient(Ingredient ingredient);
    Ingredient getIngredientByName(String name);
    Optional<Ingredient> getIngredientById(Long id);
    List<Ingredient> getAllIngredients();
}
