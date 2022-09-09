package com.techelevator.service;

import com.techelevator.entity.*;
import com.techelevator.model.RecipeDTO;
import com.techelevator.model.RecipeIngredientDTO;
import com.techelevator.repo.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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

    private final AppUserServiceImpl appUserService;

    @Override
    public Recipe addRecipe(String username, RecipeDTO recipeDTO) {
        AppUser recipeCreator = appUserRepo.findByUsername(username);

        // New recipe obj + direct fields
        Recipe newRecipe = new Recipe();
        newRecipe.addRecipeDTO(recipeDTO);
        newRecipe.setAppUser(recipeCreator);

        // Set steps on recipe
        List<Step> newSteps = new ArrayList<>();
        for (Step step : recipeDTO.getSteps()) {
            Step newStep = Step.builder()
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

        if (recipeDTO.isLiked()) {
            newRecipe.addUserToLiked(recipeCreator);
        }

        return recipeRepo.save(newRecipe);
    }

    @Override
    public boolean likeRecipeForUser(String username, Long recipeId) {
        AppUser appUser = appUserRepo.findByUsername(username);
        Recipe recipe = recipeRepo.findById(recipeId).get();
        recipe.addUserToLiked(appUser);
        recipeRepo.save(recipe);
        return true;
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

    @Override
    public List<Recipe> getMyRecipes(String username) {
        log.info("Fetching {}'s myRecipes from database", username);
        try {
            Long userId = appUserService.getId(username).getId();
            AppUser appUser = new AppUser();
            appUser.setId(userId);
            return recipeRepo.findByAppUser(appUser);
        } catch (Exception e){
            log.info("Fetching failed for {}. Exception: " + e.getMessage(), username);
        }
        throw new RuntimeException("Recipes not found.");
    }

    @Override
    public Recipe updateRecipe (String username, Long id, Recipe recipe) {
        log.info("Updating Recipe for id {}", id);
        try {
            AppUser appUser = appUserService.getUser(username);
            if (id == recipe.getId() && appUser.getId() == recipe.getAppUser().getId()) {
                recipe.setAppUser(appUser);
                return recipeRepo.save(recipe);
            }
        } catch (Exception e){
            log.warn("Fetching failed for updating recipe {} by user {} reason: {} || message: {} ", recipe, username, e.getCause(), e.getMessage());
            throw new RuntimeException("Recipe update failed", e.getCause());
        }
        return null;
    }

    @Override
    public Boolean deleteRecipe(String username, Long recipeId) {
        //Validate user is deleting their own recipe
        log.info("Attemping to delete recipe id: {}. Requested by {}", recipeId, username);
        Recipe recipe = getRecipeById(recipeId);
        AppUser currentUser = appUserService.getId(username);
        if (currentUser.getId().equals(recipe.getAppUser().getId())) {
            recipeRepo.deleteById(recipeId);
            log.info("Successfully deleted recipe with id of: {}", recipeId);
            return true;
        } else {
            log.info("Failed to delete recipe with id of: {}", recipeId);
            return false;
        }
    }

}

