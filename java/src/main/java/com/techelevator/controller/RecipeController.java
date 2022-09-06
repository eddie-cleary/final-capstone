package com.techelevator.controller;

import com.techelevator.entity.AppUser;
import com.techelevator.entity.Recipe;
import com.techelevator.model.RecipeDTO;
import com.techelevator.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/recipes")
public class RecipeController {

    private final RecipeService recipeService;

    @GetMapping("/{id}")
    public Recipe getRecipeById(@PathVariable Long id) {
        return recipeService.getRecipeById(id);
    }

    @PostMapping("/add")
    public Recipe addRecipe(@RequestBody RecipeDTO recipeDTO, Principal principal) {
        return recipeService.addRecipe(principal, recipeDTO);
    }

    @GetMapping("/all")
    public List<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }
}
