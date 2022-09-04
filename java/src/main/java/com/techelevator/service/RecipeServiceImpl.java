package com.techelevator.service;

import com.techelevator.entity.AppUser;
import com.techelevator.entity.Recipe;
import com.techelevator.repo.AppUserRepo;
import com.techelevator.repo.RecipeRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.Principal;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepo recipeRepo;

    private final AppUserRepo appUserRepo;

    @Override
    public Recipe saveRecipe(Principal principal, Recipe recipe) {
        AppUser currUser = appUserRepo.findByUsername(principal.getName());
        recipe.setAppUser(currUser);
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
