 package com.techelevator.service;


import com.techelevator.entity.AppUser;
import com.techelevator.entity.MealRecipe;
import com.techelevator.model.MealRecipeDTO;
import com.techelevator.repo.MealRecipeRepo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import java.util.Optional;

 @Slf4j
@Service
@AllArgsConstructor
public class MealRecipeServiceImpl implements MealRecipeService {
    @Autowired
    AppUserService appUserService;
    @Autowired
    MealRecipeRepo mealRecipeRepo;

    @Autowired
    MealService mealService;

    @Autowired
    RecipeService recipeService;

    @Override
    public MealRecipe getMealRecipeById(String username, Long mealRecipeId) {
        try {
            AppUser appUser = appUserService.getUser(username);
            MealRecipe mealRecipe = mealRecipeRepo.findById(mealRecipeId).get();
            if (isMealRecipeCreator(username, mealRecipeId, "get")) {
                return mealRecipe;
            } else {
                throw new IllegalAccessException("You are not authorized to view this meal recipe.");
            }
        } catch (Exception e) {
            log.warn("Unable to get meal recipe id {} for \"{}\"", mealRecipeId, username);
            throw new ResourceAccessException("Unable to retrieve meal Recipe.");
        }
    }

    @Override
    public MealRecipe createMealRecipe(String username, MealRecipeDTO mealRecipeDTO) {
        try {
            log.info("Creating meal recipe for \"{}\"", username);
            MealRecipe newMealRecipe = new MealRecipe();
            newMealRecipe.setServings(mealRecipeDTO.getServings());
            mealService.getMealById(username, mealRecipeDTO.getMeal_id());
            newMealRecipe.setMeal(mealService.getMealById(username, mealRecipeDTO.getMeal_id()));
            newMealRecipe.setRecipe(recipeService.getRecipeById(username, mealRecipeDTO.getRecipe_id()));
            return mealRecipeRepo.save(newMealRecipe);
        } catch (Exception e) {
            log.warn("Exception occurred trying to create a meal recipe for \"{}\": " + e.getMessage(), username);
            throw new RuntimeException("Could not create a new meal Recipe.");
        }
    }

    @Override
    public Boolean updateServingsById(String username, Long mealRecipeId, MealRecipeDTO mealRecipeDTO) {
        log.info("User \"{}\" is updating servings with meal recipe id {}", username, mealRecipeId);
        try {
            AppUser appUser = appUserService.getUser(username);
            MealRecipe mealRecipe = mealRecipeRepo.findById(mealRecipeId).get();
            if (isMealRecipeCreator(username, mealRecipeId, "update")) {
                mealRecipe.setServings(mealRecipeDTO.getServings());
                mealRecipeRepo.save(mealRecipe);
                return true;
            } else {
                throw new IllegalAccessException("You cannot update this meal recipe.");
            }
        } catch (Exception e) {
            log.warn("Exception occurred trying to update meal recipe with id {}" + e.getMessage());
            return false;
        }
    }

    @Override
    public Boolean deleteMealRecipe(String username, Long mealRecipeId) {
        log.info("User \"{}\" is deleting meal with id {}", username, mealRecipeId);
        try {
            if (isMealRecipeCreator(username, mealRecipeId, "delete")) {
                mealRecipeRepo.deleteById(mealRecipeId);
                return true;
            }
        } catch (Exception e) {
            log.warn("Exception occurred trying to delete meal recipe with id {} " + e.getMessage());
            return false;
        }
        return false;
    }

    public Long getId(String username) {
        //returns user id
        AppUser appUser = appUserService.getId(username);
        return appUser.getId();
    }

    public Boolean isMealRecipeCreator(String username, Long mealRecipeId, String action) {
        //validates if meal recipe is created by user
        try {
            Optional<MealRecipe> mealRecipeFromDB = mealRecipeRepo.findById(mealRecipeId);
            if (mealRecipeFromDB.isPresent()) {
            if (getId(username).equals(mealRecipeFromDB.get().getMeal().getDay().getMealPlan().getAppUser().getId())) {
                    return true;
                }
            } else {
                log.warn("User \"{}\" attempted to {} a meal recipe that is not theirs.", username, action);
                throw new RuntimeException("Unable to validate user.");
            }

        } catch (Exception e) {
            log.warn("Exception occurred trying to validate user: " + e.getMessage());
        }
        throw new RuntimeException("Unable to validate user.");
    }
}
