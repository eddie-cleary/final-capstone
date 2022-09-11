package com.techelevator.service;

import com.techelevator.entity.MealPlan;
import com.techelevator.model.MealPlanDTO;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;


import java.security.Principal;
import java.util.List;

public interface MealPlanService {

    MealPlan getMealPlanById(String username, Long mealPlanId) throws IllegalAccessException;
    public List<MealPlan> getMealPlans(String username);

    MealPlan createMealPlan(String username, MealPlanDTO mealPlanDTO);

    MealPlan updateMealPlan(String username, Long mealPlanId, MealPlanDTO mealPlanDTO);

    Boolean deleteMealPlan(String username, Long mealPlanId);
}
