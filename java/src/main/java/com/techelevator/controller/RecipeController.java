package com.techelevator.controller;

import com.techelevator.entity.AppUser;
import com.techelevator.entity.Recipe;
import com.techelevator.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Optional;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/recipe")
public class RecipeController {

    private final RecipeService recipeService;

    @GetMapping("/{id}")
    public Recipe getRecipeById(@PathVariable Long id) {
        return recipeService.getRecipeById(id);
    }

    @PostMapping("/add")
    public Recipe addRecipe(@RequestBody Recipe recipe, Principal principal) {
        return recipeService.saveRecipe(principal, recipe);
    }
}
