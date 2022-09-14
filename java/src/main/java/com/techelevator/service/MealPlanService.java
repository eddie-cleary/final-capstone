package com.techelevator.service;

import com.techelevator.entity.MealPlan;
import com.techelevator.model.MealPlanDTO;
import com.techelevator.model.MealPlanPayload;
import com.techelevator.model.MealPlanResponse;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;


import java.security.Principal;
import java.util.List;

public interface MealPlanService {

    MealPlanResponse getMealPlanById(String username, Long mealPlanId) throws IllegalAccessException;
    public List<MealPlan> getMealPlans(String username);

    MealPlanResponse addMealPlan(String username, MealPlanPayload mealPlanPayload);

    MealPlan updateMealPlan(String username, Long mealPlanId, MealPlanDTO mealPlanDTO);

    Boolean deleteMealPlan(String username, Long mealPlanId);
}
