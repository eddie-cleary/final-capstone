package com.techelevator.service;


import com.techelevator.entity.*;
import com.techelevator.model.DayDTO;
import com.techelevator.model.MealDTO;
import com.techelevator.model.MealPlanDTO;

import com.techelevator.model.MealRecipeDTO;
import com.techelevator.repo.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
@AllArgsConstructor
public class MealPlanServiceImpl implements MealPlanService {
    @Autowired
    AppUserService appUserService;
    @Autowired
    MealPlanRepo mealPlanRepo;
    @Autowired
    DayRepo dayRepo;
    @Autowired
    MealRepo mealRepo;
    @Autowired
    RecipeRepo recipeRepo;
    @Autowired
    MealRecipeRepo mealRecipeRepo;

    @Override
    public MealPlan getMealPlanById(String username, Long mealPlanId) {
        try {
            AppUser appUser = appUserService.getUser(username);
            MealPlan mealPlan = mealPlanRepo.findById(mealPlanId).get();
            if (appUser.getId() == mealPlan.getAppUser().getId()) {
                return mealPlan;
            } else {
                throw new IllegalAccessException("You are not authorized to view this meal plan.");
            }
        } catch (Exception e) {
            log.warn("Unable to get meal plan id {} for \"{}\"", mealPlanId, username);
            throw new ResourceAccessException("Unabled to retrieve meal plan.");
        }
    }

    @Override
    public List<MealPlan> getMealPlans(String username) {
        try {
            AppUser currentUser = appUserService.getUser(username);
            return mealPlanRepo.findByAppUser(currentUser);
        } catch (Exception e) {
            log.warn("Unable to get meal plans for \"{}\"", username);
            throw new ResourceAccessException("Unable to get meal plans.");
        }
    }

    @Override
    public MealPlan createMealPlan(String username, MealPlanDTO mealPlanDTO) {
        try {
            log.info("Creating meal plan for \"{}\"", username);
            MealPlan newMealPlan = new MealPlan();
            newMealPlan.setTitle(mealPlanDTO.getTitle());
            newMealPlan.setAppUser(appUserService.getUser(username));
            mealPlanRepo.save(newMealPlan);

            // Set days
            Set<Day> newDays = new HashSet<>();
            for (DayDTO dayDTO : mealPlanDTO.getDays()) {
                Day newDay = new Day();
                newDay.setMealPlan(newMealPlan);
                dayRepo.save(newDay);

                Set<Meal> newMeals = new HashSet<>();
                // Set meals
                for (MealDTO mealDTO : dayDTO.getMeals()) {
                    Meal newMeal = new Meal();
                    newMeal.setTitle(mealPlanDTO.getTitle());
                    newMeal.setDay(newDay);
                    mealRepo.save(newMeal);

                    Set<MealRecipe> newMealRecipes = new HashSet<>();
                    // Set meal recipes
                    for (MealRecipeDTO mealRecipeDTO : mealDTO.getRecipes()) {
                        MealRecipe newMealRecipe = new MealRecipe();
                        newMealRecipe.setServings(mealRecipeDTO.getServings());
                        newMealRecipe.setRecipe(recipeRepo.findById(mealRecipeDTO.getRecipe_id()).get());
                        newMealRecipe.setMeal(newMeal);
                        mealRecipeRepo.save(newMealRecipe);
                        newMealRecipes.add(newMealRecipe);
                    }
                    newMeal.setMealRecipes(newMealRecipes);
                    newMeals.add(newMeal);
                }
                newDay.setMeals(newMeals);
                newDays.add(newDay);
            }
            newMealPlan.setDays(newDays);

            return newMealPlan;
        } catch (Exception e) {
            log.warn("Exception occurred trying to create a meal plan for \"{}\": " + e.getMessage(), username);
            throw new RuntimeException("Could not create a new meal plan.");
        }
    }

    @Override
    public MealPlan updateMealPlan(String username, Long id, MealPlanDTO mealPlanDTO) {
        log.info("User \"{}\" is updating meal id {}", username, id);
        try {
            AppUser appUser = appUserService.getUser(username);
            MealPlan mealPlan = mealPlanRepo.findById(id).get();

            if (appUser.getId() == mealPlan.getAppUser().getId()) {
                mealPlan.setTitle(mealPlanDTO.getTitle());
                return mealPlanRepo.save(mealPlan);
            } else {
                throw new IllegalAccessException("You are not authorized to update this meal plan.");
            }
        } catch (Exception e) {
            log.warn("Exception occurred trying to update meal plan with id {}" + e.getMessage());
        }
        return null;
    }

    @Override
    public Boolean deleteMealPlan(String username, Long mealPlanId) {
        log.info("User \"{}\" is deleting meal with id {}", username, mealPlanId);
        try {
            if (isMealCreator(username, mealPlanId, "delete")) {
                mealPlanRepo.deleteById(mealPlanId);
                return true;
            }
        } catch (Exception e) {
            log.warn("Exception occurred trying to delete meal plan with id {} " + e.getMessage());
            return false;
        }
        return false;
    }

    public Long getId(String username) {
        //returns user id
        AppUser appUser = appUserService.getId(username);
        return appUser.getId();
    }

    public Boolean isMealCreator(String username, Long mealPlanId, String action) {
        //validates if meal plan is created by user
        try {
            MealPlan mealPlanFromDB = mealPlanRepo.findById(mealPlanId).get();
            if (getId(username).equals(mealPlanFromDB.getAppUser().getId())) {
                return true;
            } else {
                log.warn("User \"{}\" attempted to {} a meal that is not theirs.", username, action);
                return false;
            }
        } catch (Exception e) {
            log.warn("Exception occurred trying to validate user: " + e.getMessage());
            return false;
        }
    }
}
