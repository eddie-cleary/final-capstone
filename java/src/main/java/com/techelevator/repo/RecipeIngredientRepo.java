package com.techelevator.repo;

import com.techelevator.entity.RecipeIngredient;
import com.techelevator.entity.RecipeIngredientKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeIngredientRepo extends JpaRepository<RecipeIngredient, RecipeIngredientKey> {
    RecipeIngredient findByRecipeId(Long id);
}
