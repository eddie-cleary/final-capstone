package com.techelevator.controller;

import com.techelevator.model.MealDTO;
import com.techelevator.model.MealPlanDTO;
import com.techelevator.service.MealPlanService;
import com.techelevator.service.MealService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;


@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/mealplans")
public class MealPlanController {

    private final MealPlanService mealPlanService;
    private final MealService mealService;

    @GetMapping
    public List<MealPlan> getMealPlans(String username) {
        return mealPlanService.getMealPlans(principal.getName());
    }

    @GetMapping("/meals")
    public List<MealDTO> getMeals(String username) {
        return mealService.getMeals(principal.getName());
    }

    @PostMapping("/create") //create a meal plan
    public MealPlan createMealPlan(Principal principal, @RequestBody MealPlanDTO mealPlanDTO) { //dto b/c id field
        return mealPlanService.createMealPlan(principal.getName(), mealPlanDTO);
    }

    @PostMapping("/meal") //create a meal
    public MealDTO createMeal(Principal principal, @RequestBody MealDTO mealDTO) {
        return mealService.createMeal(principal.getName(), mealDTO);
    }

    @PutMapping("/{id}") //update a meal plan title
    public Boolean updateMealPlanTitle(Principal principal, @RequestBody MealPlan mealPlan, @PathVariable Long mealPlanId) {
        return mealPlanService.updateMealPlanTitle(principal.getName(), mealPlan, mealPlanId);
    }

    @PutMapping("/meal/{id}") //update a meal title
    public Boolean updateMealTitle(Principal principal, @RequestBody MealDTO mealDTO, @PathVariable Long mealId) {
        return mealService.updateMealTitle(principal.getName(), mealDTO, mealId);
    }

    @DeleteMapping("/{id}")
    public Boolean deleteMealPlan(Principal principal, @PathVariable Long mealPlanId) {
        return mealPlanService.deleteMealPlan(principal.getName(), mealPlanId);
    }

    @DeleteMapping("/meal/{id}")
    public Boolean deleteMeal(Principal principal, @PathVariable Long mealId) {
        return mealService.deleteMeal(principal.getName(), mealId);
    }

}
