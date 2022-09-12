package com.techelevator.controller;

import com.techelevator.entity.MealRecipe;
import com.techelevator.model.MealDTO;
import com.techelevator.model.MealRecipeDTO;
import com.techelevator.service.MealRecipeService;
import com.techelevator.service.MealService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/mealrecipe")
public class MealRecipeController {
    MealRecipeService mealRecipeService;

    @GetMapping("/id")
    public MealRecipe getMealRecipeById(Principal principal, @PathVariable Long mealRecipeId) {
       return mealRecipeService.getMealRecipeById(principal.getName(), mealRecipeId);
    }

    @GetMapping("/create")
    public MealRecipe createMealRecipe(Principal principal, @RequestBody MealRecipeDTO mealRecipeDTO) {
        return mealRecipeService.createMealRecipe(principal.getName(), mealRecipeDTO);
    }

    @PutMapping("/{id}") //update
    public Boolean updateServings(Principal principal, @RequestBody MealRecipeDTO mealRecipeDTO, @PathVariable Long mealRecipeId) {
        return mealRecipeService.updateServingsById(principal.getName(), mealRecipeId, mealRecipeDTO);
    }

    @DeleteMapping("{id}")
    public Boolean deleteMeal(Principal principal, @PathVariable Long mealRecipeId) {
        return mealRecipeService.deleteMealRecipe(principal.getName(), mealRecipeId);
    }

}
