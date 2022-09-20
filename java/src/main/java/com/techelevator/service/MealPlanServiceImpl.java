package com.techelevator.service;


import com.techelevator.entity.*;
import com.techelevator.model.*;

import com.techelevator.repo.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Slf4j
@Service
@AllArgsConstructor
public class MealPlanServiceImpl implements MealPlanService {
    @Autowired
    AppUserRepo appUserRepo;
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
    public MealPlanResponse getMealPlanById(String username, Long mealPlanId) throws IllegalAccessException, ResourceNotFoundException {
        AppUser appUser = appUserRepo.findByUsername(username);
        MealPlan mealPlan = mealPlanRepo.findById(mealPlanId).get();
        if (Objects.isNull(mealPlan)) {
            throw new ResourceNotFoundException("Meal plan with id " + mealPlanId + " not found.");
        }
        if (appUser.getId() == mealPlan.getAppUser().getId()) {
            MealPlanResponse mealPlanResponse = new MealPlanResponse(mealPlan);
            return mealPlanResponse;
        }
        throw new IllegalAccessException("You are not authorized to view this meal plan.");
    }

    @Override
    public List<MealPlanResponse> getMealPlans(String username) throws IllegalAccessException {
        AppUser currentUser = appUserRepo.findByUsername(username);
        List<MealPlan> usersMealPlans = mealPlanRepo.findByAppUser(currentUser);
        if (Objects.isNull(usersMealPlans)) {
            throw new ResourceNotFoundException("No meal plans for user " + username + " were found.");
        }
        List<MealPlanResponse> formattedMealPlanResponse = new ArrayList<>();
        for (MealPlan mealplan : usersMealPlans) {
            MealPlanResponse mealPlanResponse = this.getMealPlanById(username, mealplan.getId());
            formattedMealPlanResponse.add(mealPlanResponse);
        }
        return formattedMealPlanResponse;
    }

    @Override
    public MealPlanResponse addMealPlan(String username, MealPlanPayload mealPlanPayload) throws IllegalAccessException {
            log.info("Creating meal plan for \"{}\"", username);
            MealPlan newMealPlan = new MealPlan();
            newMealPlan.setTitle(mealPlanPayload.getTitle());
            newMealPlan.setAppUser(appUserRepo.findByUsername(username));
            mealPlanRepo.save(newMealPlan);

            // Set days
            Set<Day> newDays = new HashSet<>();
            for (DayDTO dayDTO : mealPlanPayload.getDays()) {
                Day newDay = new Day();
                newDay.setMealPlan(newMealPlan);
                dayRepo.save(newDay);

                Set<Meal> newMeals = new HashSet<>();
                // Set meals
                for (MealDTO mealDTO : dayDTO.getMeals()) {
                    Meal newMeal = new Meal();
                    newMeal.setTitle(mealDTO.getTitle());
                    newMeal.setDay(newDay);
                    mealRepo.save(newMeal);

                    Set<MealRecipe> newMealRecipes = new HashSet<>();
                    // Set meal recipes
                    for (MealRecipeDTO mealRecipeDTO : mealDTO.getMealRecipes()) {
                        MealRecipe newMealRecipe = new MealRecipe();
                        newMealRecipe.setServings(mealRecipeDTO.getServings());
                        newMealRecipe.setRecipe(recipeRepo.findById(mealRecipeDTO.getRecipe().getId()).get());
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

            mealPlanRepo.save(newMealPlan);

            return this.getMealPlanById(username, newMealPlan.getId());
    }

    @Override
    @Transactional
    public MealPlanResponse updateMealPlan(String username, Long id, MealPlanDTO mealPlanDTO) throws IllegalAccessException {
        log.info("User \"{}\" is updating meal id {}", username, id);
        AppUser appUser = appUserRepo.findByUsername(username);
        MealPlan oldMealPlan = mealPlanRepo.findById(id).get();

        if (id == mealPlanDTO.getId() && appUser.getId() == mealPlanRepo.findById(id).get().getAppUser().getId()) {

//            mealPlanRepo.deleteById(oldMealPlan.getId());
//
//            MealPlan newMealPlan = new MealPlan();
//            newMealPlan.setTitle(mealPlanDTO.getTitle());
//            newMealPlan.setAppUser(appUser);
//            mealPlanRepo.save(newMealPlan);

            oldMealPlan.setTitle(mealPlanDTO.getTitle());

            dayRepo.deleteAll(oldMealPlan.getDays());
            oldMealPlan.getDays().removeAll(oldMealPlan.getDays());

//            // Set days
            Set<Day> newDays = new HashSet<>();
            for (DayDTO dayDTO : mealPlanDTO.getDays()) {
                Day newDay = new Day();
                newDay.setMealPlan(oldMealPlan);
                dayRepo.save(newDay);

                Set<Meal> newMeals = new HashSet<>();
                // Set meals
                for (MealDTO mealDTO : dayDTO.getMeals()) {
                    Meal newMeal = new Meal();
                    newMeal.setTitle(mealDTO.getTitle());
                    newMeal.setDay(newDay);
                    mealRepo.save(newMeal);

                    Set<MealRecipe> newMealRecipes = new HashSet<>();
                    // Set meal recipes
                    for (MealRecipeDTO mealRecipeDTO : mealDTO.getMealRecipes()) {
                        MealRecipe newMealRecipe = new MealRecipe();
                        newMealRecipe.setServings(mealRecipeDTO.getServings());
                        newMealRecipe.setRecipe(recipeRepo.findById(mealRecipeDTO.getRecipe().getId()).get());
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
            oldMealPlan.setDays(newDays);
            mealPlanRepo.save(oldMealPlan);

            return this.getMealPlanById(username, oldMealPlan.getId());
        } else {
            throw new IllegalAccessException("You are not authorized to update this meal plan.");
        }
    }

    @Override
    public Boolean deleteMealPlan(String username, Long mealPlanId) throws IllegalAccessException {
        log.info("User \"{}\" is deleting meal with id {}", username, mealPlanId);
        AppUser appUser = appUserRepo.findByUsername(username);

        if (appUser.getId() == mealPlanRepo.getOne(mealPlanId).getAppUser().getId()) {
            mealPlanRepo.deleteById(mealPlanId);
            return true;
        } else {
            throw new IllegalAccessException("You are not authorized to delete this meal plan.");
        }
    }
}
