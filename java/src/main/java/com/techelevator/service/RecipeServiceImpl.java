package com.techelevator.service;

import com.techelevator.entity.AppUser;
import com.techelevator.entity.Recipe;
import com.techelevator.entity.Step;
import com.techelevator.repo.AppUserRepo;
import com.techelevator.repo.RecipeRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepo recipeRepo;

    private final AppUserRepo appUserRepo;

    @Override
    public Recipe addRecipe(Principal principal, Recipe recipe) {
//        System.out.println("recipe " + recipe);
//        AppUser currUser = appUserRepo.findByUsername(principal.getName());
//        recipe.setAppUser(currUser);

        // save to generate the recipe id
        // create the steps and record the recipe in them
        // need to set the steps
        return new Recipe();
    }

    @Override
    public Recipe getRecipeById(Long id) {
        Optional<Recipe> recipe = recipeRepo.findById(id);
        if (recipe != null) {
            return recipe.get();
        }
        throw new RuntimeException("Recipe not found");
    }

    @Override
    public List<Recipe> getAllRecipes() {
        return recipeRepo.findAll();
    }
}
