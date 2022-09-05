package com.techelevator.service;

import com.techelevator.entity.AppUser;
import com.techelevator.entity.Recipe;
import com.techelevator.entity.Step;
import com.techelevator.repo.AppUserRepo;
import com.techelevator.repo.RecipeRepo;
import com.techelevator.repo.StepRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.Principal;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepo recipeRepo;

    private final AppUserRepo appUserRepo;

    private final StepRepo stepRepo;

    @Override
    public Recipe addRecipe(Principal principal, Recipe recipe) {
        System.out.println("recipe " + recipe);
        AppUser currUser = appUserRepo.findByUsername(principal.getName());
        recipe.setAppUser(currUser);
        List<Step> newSteps = new ArrayList<>();
        for (Step step : recipe.getSteps()) {
            Step newStep = Step.builder()
                    .index(step.getIndex())
                    .info(step.getInfo())
                    .recipe(recipe)
                    .build();
            Step savedStep = stepRepo.save(newStep);
            newSteps.add(savedStep);
        }
        recipe.setSteps(newSteps);
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

    @Override
    public List<Recipe> getAllRecipes() {
        return recipeRepo.findAll();
    }
}
