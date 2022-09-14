package com.techelevator.controller;

import com.techelevator.entity.MealPlan;
import com.techelevator.model.MealPlanDTO;
import com.techelevator.model.MealPlanPayload;
import com.techelevator.model.MealPlanResponse;
import com.techelevator.service.MealPlanService;
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

    @GetMapping
    public List<MealPlan> getMealPlans(Principal principal) {
        return mealPlanService.getMealPlans(principal.getName());
    }

    @GetMapping("/{id}")
    public MealPlanResponse getMealPlanById(Principal principal, @PathVariable Long id) throws IllegalAccessException {
        return mealPlanService.getMealPlanById(principal.getName(), id);
    }

    @PostMapping
    public MealPlanResponse addMealPlan(Principal principal, @RequestBody MealPlanPayload mealPlanPayload) {
        return mealPlanService.addMealPlan(principal.getName(), mealPlanPayload);
    }

    @PutMapping("/{id}")
    public MealPlan updateMealPlan(Principal principal, @RequestBody MealPlanDTO mealPlanDTO, @PathVariable Long id) {
        return mealPlanService.updateMealPlan(principal.getName(), id, mealPlanDTO);
    }

    @DeleteMapping("/{id}")
    public Boolean deleteMealPlan(Principal principal, @PathVariable Long id) {
        return mealPlanService.deleteMealPlan(principal.getName(), id);
    }
}
