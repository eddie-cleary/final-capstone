package com.techelevator.service;

import com.techelevator.entity.Ingredient;
import com.techelevator.exception.ApiException;

import java.util.List;
import java.util.Optional;

public interface IngredientService {
    Ingredient addIngredient(Ingredient ingredient) throws ApiException;
    Ingredient getIngredientByName(String name) throws ApiException;
    Optional<Ingredient> getIngredientById(Long id);
    List<Ingredient> getAllIngredients();
}
