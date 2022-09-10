package com.techelevator.service;

import com.techelevator.model.MealPlanDTO;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.security.Principal;
import java.util.List;

public interface MealPlanService {

    MealPlan getMealPlanById(String username, Long mealPlanId);
    public List<MealPlan> getMealPlans(String username);

    MealPlan createMealPlan(String username, MealPlanDTO mealPlanDTO);

    Boolean updateMealPlanTitle(String username, MealPlan mealPlan, Long mealPlanId);

    Boolean deleteMealPlan(String username, Long mealPlanId);
}
