package com.techelevator.service;

import com.techelevator.entity.Ingredient;

import java.util.Optional;

public interface IngredientService {
    Ingredient addIngredient(Ingredient ingredient);
    Ingredient getIngredientByName(String name);
    Optional<Ingredient> getIngredientById(Long id);
}
