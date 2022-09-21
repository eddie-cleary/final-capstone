package com.techelevator.service;

import com.techelevator.entity.*;
import com.techelevator.model.*;
import com.techelevator.repo.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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

    private final CategoryRepo categoryRepo;

    private final MealRecipeRepo mealRecipeRepo;

    @Override
    public RecipeResponse addRecipe(String username, RecipePayload recipePayload) {
        AppUser recipeCreator = appUserRepo.findByUsername(username);

        // New recipe obj + direct fields
        Recipe newRecipe = new Recipe();
        newRecipe.addRecipePayload(recipePayload);
        newRecipe.setAppUser(recipeCreator);
        recipeRepo.save(newRecipe);

        // Set steps on recipe
        List<Step> newSteps = new ArrayList<>();
        for (String step : recipePayload.getSteps()) {
            Step newStep = Step.builder()
                    .info(step)
                    .recipe(newRecipe)
                    .build();
            Step savedStep = stepRepo.save(newStep);
            newSteps.add(savedStep);
        }
        newRecipe.setSteps(newSteps);

        // Set ingredients on recipe
        List<RecipeIngredient> newRecipeIngredients = new ArrayList<>();
        for (RecipeIngredientDTO recipeIngredientDTO : recipePayload.getRecipeIngredients()) {
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

        // Set categories on recipe
        Set<Category> newRecipeCategories = new HashSet<>();
        for (String categoryName : recipePayload.getRecipeCategories()) {
            Category category = categoryRepo.findByName(categoryName);
            category.addRecipe(newRecipe);
            newRecipeCategories.add(category);
        }
        newRecipe.setRecipeCategory(newRecipeCategories);

        if (recipePayload.isLiked()) {
            newRecipe.addUserToLiked(recipeCreator);
        }

        recipeRepo.save(newRecipe);
        return this.getRecipeById(username, newRecipe.getId());
    }

    @Override
    public boolean likeRecipeForUser(String username, Long recipeId, Boolean isLiked) {
        System.out.println("is liked " + isLiked);
        AppUser appUser = appUserRepo.findByUsername(username);
        Optional<Recipe> recipe = recipeRepo.findById(recipeId);
        if (!recipe.isPresent()) {
            throw new ResourceNotFoundException("Recipe with id " + recipeId + " was not found.");
        }
        if (isLiked) {
            System.out.println("turning to off");
            recipe.get().addUserToLiked(appUser);
        } else {
            recipe.get().getRecipesLiked().remove(appUser);
        }
        recipeRepo.save(recipe.get());
        return true;
    }

    @Override
    public RecipeResponse getRecipeById(String username, Long id) {
        Optional<Recipe> recipe = recipeRepo.findById(id);
        if (!recipe.isPresent()) {
            throw new ResourceNotFoundException("Recipe with id " + id + " not found.");
        }
        return formatRecipeResponse(recipe.get(), username);
    }

    @Override
    public List<RecipeResponse> getAllRecipes(String username) {
        List<Recipe> recipes = recipeRepo.findAll();
        AppUser appUser = appUserRepo.findByUsername(username);
        return formatRecipeResponseList(recipes, username);
    }

    @Override
    public List<RecipeResponse> getMyRecipes(String username) {
        log.info("Fetching {}'s myRecipes from database", username);
        AppUser appUser = appUserRepo.findByUsername(username);
        List<Recipe> recipes = recipeRepo.findByAppUser(appUser);
        return formatRecipeResponseList(recipes, username);
    }

    @Override
    @Transactional
    public RecipeResponse updateRecipe (String username, Long id, RecipePayload recipePayload) throws IllegalAccessException {
        log.info("Updating Recipe for id {}", id);


        AppUser appUser = appUserService.getUser(username);
        if (appUser.getId() == recipeRepo.findById(id).get().getAppUser().getId()) {
            Recipe oldRecipe = recipeRepo.findById(id).get();
            oldRecipe.addRecipePayload(recipePayload);

            // Set steps on recipe
            stepRepo.deleteAll(oldRecipe.getSteps());
            oldRecipe.getSteps().removeAll(oldRecipe.getSteps());
            List<Step> newSteps = new ArrayList<>();
            for (String step : recipePayload.getSteps()) {
                Step newStep = Step.builder()
                        .info(step)
                        .recipe(oldRecipe)
                        .build();
                Step savedStep = stepRepo.save(newStep);
                newSteps.add(savedStep);
            }
            oldRecipe.setSteps(newSteps);

            recipeIngredientRepo.deleteAll(oldRecipe.getRecipeIngredients());
            oldRecipe.getRecipeIngredients().removeAll(oldRecipe.getRecipeIngredients());

            // Set ingredients on recipe
            List<RecipeIngredient> newRecipeIngredients = new ArrayList<>();
            for (RecipeIngredientDTO recipeIngredientDTO : recipePayload.getRecipeIngredients()) {
                Ingredient foundIngredient = ingredientRepo.findByName(recipeIngredientDTO.getName());
                RecipeIngredient newRecipeIngredient = RecipeIngredient.builder()
                        .ingredient(foundIngredient)
                        .recipe(oldRecipe)
                        .quantity(recipeIngredientDTO.getQuantity())
                        .build();
                RecipeIngredient savedRecipeIngredient = recipeIngredientRepo.save(newRecipeIngredient);
                newRecipeIngredients.add(savedRecipeIngredient);
            }
            oldRecipe.setRecipeIngredients(newRecipeIngredients);

            oldRecipe.removeCategories();
            for (Category category : oldRecipe.getRecipeCategory()) {
                category.getRecipeCategory().remove(oldRecipe);
                categoryRepo.save(category);
            }
            // Set categories on recipe
            Set<Category> newRecipeCategories = new HashSet<>();
            for (String categoryName : recipePayload.getRecipeCategories()) {
                Category category = categoryRepo.findByName(categoryName);
                category.addRecipe(oldRecipe);
                newRecipeCategories.add(category);
            }
            oldRecipe.setRecipeCategory(newRecipeCategories);

            appUser.getRecipesLiked().remove(oldRecipe);
            appUserRepo.save(appUser);

            if (recipePayload.isLiked()) {
                oldRecipe.addUserToLiked(appUser);
            }

            recipeRepo.save(oldRecipe);

            return formatRecipeResponse(oldRecipe, username);
        }
        throw new IllegalAccessException("You are not authorized to update this recipe");
    }

    @Override
    @Transactional
    public void deleteRecipeContents(Recipe recipe) {
        stepRepo.deleteAll(recipe.getSteps());
        recipe.getSteps().removeAll(recipe.getSteps());

        recipeIngredientRepo.deleteAll(recipe.getRecipeIngredients());
        recipe.getRecipeIngredients().removeAll(recipe.getRecipeIngredients());

        mealRecipeRepo.deleteAll(recipe.getMealRecipes());
        recipe.getMealRecipes().removeAll(recipe.getMealRecipes());

        recipe.removeCategories();
        recipe.removeLikes();
        recipe.removeSteps();
        recipe.removeRecipeIngredients();

        recipeRepo.delete(recipe);
    }

    @Override
    @Transactional
    public Boolean deleteRecipe(String username, Long recipeId) throws IllegalAccessException {
        //Validate user is deleting their own recipe
        log.info("Attemping to delete recipe id: {}. Requested by {}", recipeId, username);
        Recipe recipe = recipeRepo.findById(recipeId).get();
        AppUser currentUser = appUserRepo.findByUsername(username);

        if (currentUser.getId().equals(recipe.getAppUser().getId())) {

        stepRepo.deleteAll(recipe.getSteps());
        recipe.getSteps().removeAll(recipe.getSteps());

        recipeIngredientRepo.deleteAll(recipe.getRecipeIngredients());
        recipe.getRecipeIngredients().removeAll(recipe.getRecipeIngredients());

        mealRecipeRepo.deleteAll(recipe.getMealRecipes());
        recipe.getMealRecipes().removeAll(recipe.getMealRecipes());

        recipe.removeCategories();
        recipe.removeLikes();

        AppUser parentUser = appUserRepo.findByUsername(username);
        parentUser.getRecipes().remove(recipe);

        recipeRepo.deleteById(recipe.getId());

        log.info("Successfully deleted recipe with id of: {}", recipeId);

        return true;
        }
        throw new IllegalAccessException("You are not authorized to delete this recipe.");
    }

    public List<RecipeResponse> formatRecipeResponseList(List<Recipe> recipes, String username) {
        log.info("Formatting recipes for " + recipes);
        List<RecipeResponse> formattedRecipes = new ArrayList<>();
        AppUser appUser = appUserRepo.findByUsername(username);
        for (Recipe recipe : recipes) {
            RecipeResponse recipeResponse = formatRecipeResponse(recipe, username);
            formattedRecipes.add(recipeResponse);
        }
        return formattedRecipes;
    }

    public RecipeResponse formatRecipeResponse(Recipe recipe, String username) {
        AppUser appUser = appUserRepo.findByUsername(username);
        return new RecipeResponse(recipe, appUser.getId());
    }
}

