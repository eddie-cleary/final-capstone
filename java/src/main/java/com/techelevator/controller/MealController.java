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
@RequestMapping("/meal")
public class MealController {
    private final MealService mealService;

//    @GetMapping("{id}")
//    public Meal getMeal(Principal principal, @PathVariable Long mealId) {
//        return mealService.getMealById(principal.getName(), mealId);
//    }
//    @GetMapping("/all")
//    public List<Meal> getMeals(Principal principal) {
//        return mealService.getMeals(principal.getName());
//    }
//
//    @PostMapping("/create") //create
//    public Meal createMeal(Principal principal, @RequestBody MealDTO mealDTO) { //dto b/c id field
//        return mealService.createMeal(principal.getName(), mealDTO);
//    }

    @PutMapping("/{id}") //update
    public Boolean updateMealTitle(Principal principal, @RequestBody MealDTO mealDTO, @PathVariable Long mealId) {
        return mealService.updateMealTitle(principal.getName(), mealDTO, mealId);
    }

    @DeleteMapping("{id}")
    public Boolean deleteMeal(Principal principal, @PathVariable Long mealId) {
        return mealService.deleteMeal(principal.getName(), mealId);
    }

}
