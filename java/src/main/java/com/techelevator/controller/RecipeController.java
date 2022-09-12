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
    public Recipe getRecipeById(Principal principal, @PathVariable Long id) {
        return recipeService.getRecipeById(principal.getName(), id);
    }

    @PostMapping("/add")
    public Recipe addRecipe(@RequestBody RecipeDTO recipeDTO, Principal principal) {
        return recipeService.addRecipe(principal.getName(), recipeDTO);
    }

    @GetMapping("/all")
    public List<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    @PutMapping("/{recipeId}/like")
    public boolean likeRecipeForCurrentUser(Principal principal, @PathVariable Long recipeId) {
        return recipeService.likeRecipeForUser(principal.getName(), recipeId);
    }

    @PutMapping("/{id}")
    public Recipe updateRecipe(Principal principal, @PathVariable Long id, @RequestBody RecipeDTO recipeDTO) {
        return recipeService.updateRecipe(principal.getName(), id, recipeDTO);
    }

    @GetMapping("/myRecipes")
    public List<Recipe> getMyRecipes(Principal principal) {
        return recipeService.getMyRecipes(principal.getName());
    }

    @DeleteMapping("/{recipeId}")
    public Boolean deleteRecipe(Principal principal, @PathVariable Long recipeId) {
        return recipeService.deleteRecipe(principal.getName(), recipeId);
    }
}
