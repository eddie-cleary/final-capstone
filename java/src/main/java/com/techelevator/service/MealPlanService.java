package com.techelevator.service;

import com.techelevator.model.MealPlanDTO;
import com.techelevator.model.MealPlanPayload;
import com.techelevator.model.MealPlanResponse;
import org.apache.velocity.exception.ResourceNotFoundException;

import java.util.List;

public interface MealPlanService {

    MealPlanResponse getMealPlanById(String username, Long mealPlanId) throws IllegalAccessException, ResourceNotFoundException;
    public List<MealPlanResponse> getMealPlans(String username) throws IllegalAccessException;

    MealPlanResponse addMealPlan(String username, MealPlanPayload mealPlanPayload) throws IllegalAccessException;

    MealPlanResponse updateMealPlan(String username, Long mealPlanId, MealPlanDTO mealPlanDTO) throws IllegalAccessException;

    Boolean deleteMealPlan(String username, Long mealPlanId) throws IllegalAccessException;
}
