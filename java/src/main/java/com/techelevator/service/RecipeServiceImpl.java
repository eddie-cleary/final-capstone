package com.techelevator.service;

import com.techelevator.entity.Recipe;
import com.techelevator.repo.RecipeRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepo recipeRepo;

    @Override
    public Recipe addRecipe(Recipe recipe) {
        return recipeRepo.save(recipe);
    }

    @Override
    public Recipe getRecipeById(Long id) {
        Optional<Recipe> recipe = recipeRepo.findById(id);
        if (recipe != null) {
            return recipe.get();
        }
        throw new RuntimeException("Recipe not found");
    }
}
