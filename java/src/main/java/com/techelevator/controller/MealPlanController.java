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

    @GetMapping("{id}")
    public MealPlan getMealPlan(Principal principal, @PathVariable Long mealPlanId) {
        return mealPlanService.getMealPlanById(principal.getName(), mealPlanId);
    }
    @GetMapping("/all")
    public List<MealPlan> getMealPlans(Principal principal) {
        return mealPlanService.getMealPlans(principal.getName());
    }

    @PostMapping("/create") //create a meal plan
    public MealPlan createMealPlan(Principal principal, @RequestBody MealPlanDTO mealPlanDTO) { //dto b/c id field
        return mealPlanService.createMealPlan(principal.getName(), mealPlanDTO);
    }

    @PutMapping("/{id}") //update a meal plan title
    public Boolean updateMealPlanTitle(Principal principal, @RequestBody MealPlan mealPlan, @PathVariable Long mealPlanId) {
        return mealPlanService.updateMealPlanTitle(principal.getName(), mealPlan, mealPlanId);
    }

    @DeleteMapping("/{id}")
    public Boolean deleteMealPlan(Principal principal, @PathVariable Long mealPlanId) {
        return mealPlanService.deleteMealPlan(principal.getName(), mealPlanId);
    }

}
