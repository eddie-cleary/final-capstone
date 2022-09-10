package com.techelevator.service;

import com.techelevator.model.MealPlanDTO;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

public interface MealPlanService {

    List<MealPlan> getMealPlans(String username);

    MealPlan createMealPlan(String username, MealPlanDTO mealPlanDTO);

    Boolean updateMealPlanTitle(String username, MealPlan mealPlan, Long mealPlanId);

    Boolean deleteMealPlan(String username, Long mealPlanId);
}
