package com.techelevator.service;

import com.techelevator.entity.*;
import com.techelevator.model.RecipeDTO;
import com.techelevator.model.RecipeIngredientDTO;
import com.techelevator.repo.*;
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

    private final IngredientRepo ingredientRepo;

    private final RecipeIngredientRepo recipeIngredientRepo;

//    @Override
//    public Recipe addRecipe(Principal principal, Recipe recipe) {
//        System.out.println("recipe " + recipe);
//        AppUser currUser = appUserRepo.findByUsername(principal.getName());
//        recipe.setAppUser(currUser);
//        List<Step> newSteps = new ArrayList<>();
//        for (Step step : recipe.getSteps()) {
//            Step newStep = Step.builder()
//                    .index(step.getIndex())
//                    .info(step.getInfo())
//                    .recipe(recipe)
//                    .build();
//            Step savedStep = stepRepo.save(newStep);
//            newSteps.add(savedStep);
//        }
//        recipe.setSteps(newSteps);
//        return recipeRepo.save(recipe);
//    }

    @Override
    public Recipe addRecipe(Principal principal, RecipeDTO recipeDTO) {
        AppUser currUser = appUserRepo.findByUsername(principal.getName());

        // New recipe obj + direct fields
        Recipe newRecipe = new Recipe();
        newRecipe.setAppUser(currUser);
        newRecipe.setTitle(recipeDTO.getTitle());
        newRecipe.setDescription(recipeDTO.getDescription());
        newRecipe.setServings(recipeDTO.getServings());
        newRecipe.setPrepTime(recipeDTO.getPrepTime());
        newRecipe.setCookTime(recipeDTO.getCookTime());
        newRecipe.setImgUrl(recipeDTO.getImgUrl());

        // Set steps on recipe
        List<Step> newSteps = new ArrayList<>();
        for (Step step : recipeDTO.getSteps()) {
            Step newStep = Step.builder()
                    .index(step.getIndex())
                    .info(step.getInfo())
                    .recipe(newRecipe)
                    .build();
            Step savedStep = stepRepo.save(newStep);
            newSteps.add(savedStep);
        }
        newRecipe.setSteps(newSteps);

        // Set ingredients on recipe
        List<RecipeIngredient> newRecipeIngredients = new ArrayList<>();
        for (RecipeIngredientDTO recipeIngredientDTO : recipeDTO.getRecipeIngredients()) {
            Ingredient foundIngredient = ingredientRepo.findByName(recipeIngredientDTO.getName());
            RecipeIngredient newRecipeIngredient = RecipeIngredient.builder()
                    .ingredient(foundIngredient)
                    .recipe(newRecipe)
                    .quantity(recipeIngredientDTO.getQuantity())
                    .build();
            RecipeIngredient savedRecipeIngredient = recipeIngredientRepo.save(newRecipeIngredient);
            newRecipeIngredients.add(savedRecipeIngredient);
        }
        newRecipe.setRecipeIngredients(newRecipeIngredients);

        return recipeRepo.save(newRecipe);
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
