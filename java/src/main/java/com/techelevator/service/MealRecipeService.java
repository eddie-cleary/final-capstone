package com.techelevator.service;

import com.techelevator.entity.MealPlan;
import com.techelevator.model.MealPlanDTO;

import java.util.List;

public interface MealRecipeService {
    MealPlan getMealPlanById(String username, Long mealPlanId);

    List<MealPlan> getMealPlans(String username);

    MealPlan createMealPlan(String username, MealPlanDTO mealPlanDTO);

    MealPlan updateMealPlan(String username, Long id, MealPlanDTO mealPlanDTO);

    Boolean deleteMealPlan(String username, Long mealPlanId);
}
