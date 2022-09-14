package com.techelevator.service;

import com.techelevator.entity.*;
import com.techelevator.model.*;
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

    private final CategoryRepo categoryRepo;

    @Override
    public RecipeResponse addRecipe(String username, RecipePayload recipePayload) {
        AppUser recipeCreator = appUserRepo.findByUsername(username);

        // New recipe obj + direct fields
        Recipe newRecipe = new Recipe();
        newRecipe.addRecipePayload(recipePayload);
        newRecipe.setAppUser(recipeCreator);

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
        for (String categoryName : recipePayload.getRecipeCategory()) {
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
    public boolean likeRecipeForUser(String username, Long recipeId) {
        AppUser appUser = appUserRepo.findByUsername(username);
        Recipe recipe = recipeRepo.findById(recipeId).get();
        recipe.addUserToLiked(appUser);
        recipeRepo.save(recipe);
        return true;
    }

    @Override
    public RecipeResponse getRecipeById(String username, Long id) {
        Optional<Recipe> recipe = recipeRepo.findById(id);
        if (isRecipeCreator(username, id, "get")) {
            if (recipe.isPresent()) {
                Long currUserId = appUserService.getId(username).getId();
                RecipeResponse recipeResponse = new RecipeResponse(recipe.get(), currUserId);
                return recipeResponse;
            }
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
            AppUser appUser = appUserRepo.findByUsername(username);
            return recipeRepo.findByAppUser(appUser);
        } catch (Exception e){
            log.info("Fetching failed for {}. Exception: " + e.getMessage(), username);
        }
        throw new RuntimeException("Recipes not found.");
    }

    @Override
    public Recipe updateRecipe (String username, Long id, RecipePayload recipePayload) {
        log.info("Updating Recipe for id {}", id);

        try {
            AppUser appUser = appUserService.getUser(username);
            if (id == recipePayload.getId() && appUser.getId() == recipeRepo.findById(id).get().getAppUser().getId()) {

                Recipe oldRecipe = recipeRepo.findById(id).get();
                oldRecipe.addRecipePayload(recipePayload);

                oldRecipe.getSteps().removeAll(oldRecipe.getSteps());

                // Set steps on recipe
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

                return recipeRepo.save(oldRecipe);
            }
        } catch (Exception e){
            log.warn("Fetching failed for updating recipe {} by user {} reason: {} || message: {} ", recipePayload, username, e.getCause(), e.getMessage());
            throw new RuntimeException("Recipe update failed", e.getCause());
        }
        return null;
    }

    @Override
    public Boolean deleteRecipe(String username, Long recipeId) {
        //Validate user is deleting their own recipe
        log.info("Attemping to delete recipe id: {}. Requested by {}", recipeId, username);
        Recipe recipe = recipeRepo.findById(recipeId).get();
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

    public Long getId(String username) {
        //returns user id
        AppUser appUser = appUserService.getId(username);
        return appUser.getId();
    }

    public Boolean isRecipeCreator(String username, Long recipeId, String action) {
        //validates if recipe is created by user
        try {
            Optional<Recipe> recipeFromDB = recipeRepo.findById(recipeId);
            if (recipeFromDB.isPresent()) {
                if (getId(username).equals(recipeFromDB.get().getAppUser().getId())) {
                    return true;
                }
            } else {
                log.warn("User \"{}\" attempted to {} a recipe that is not theirs.", username, action);
                throw new RuntimeException("You attempted to get a recipe that is not yours.");
            }

        } catch (Exception e) {
            log.warn("Exception occurred trying to validate user: " + e.getMessage());
        }
        throw new RuntimeException("Unable to validate user.");
    }

}

